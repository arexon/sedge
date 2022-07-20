import fse from 'fs-extra'
import { cyan, magenta, blackBright, green } from 'colorette'
import { debounce } from '@antfu/utils'
import { watch as chokidarWatch } from 'chokidar'
import { normalize, resolve, extname } from 'pathe'
import { logger } from '../logger'
import { loadModule } from '../loader'
import { changeExt, getPath, scanPaths } from './utils'
import { hooks } from '../core/api/hooks'

interface BuildOptions {
	callHook: boolean
}

export async function build(options: BuildOptions): Promise<void> {
	options = { ...{ callHook: true }, ...options }

	const start = Date.now()
	const minify = global.mode === 'build' && global.config.atropa.minify
	const { modules, assets } = scanPaths({
		paths: [
			global.config.packs.behaviorPack,
			global.config.packs.resourcePack
		]
	})

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			const content = await loadModule(path)
			fse.outputJSONSync(
				getPath(changeExt(path, '.json')),
				content,
				minify ? undefined : { spaces: '\t' }
			)
		}),
		...assets.map((path) => {
			fse.copySync(path, getPath(path))
		}),
		options.callHook && (await hooks.callHook('on:build'))
	])

	if (global.mode === 'dev') return

	const successResults = results.filter(
		(result) => result.status === 'fulfilled'
	)
	logger.success(
		`Compiled ${successResults.length} files in ${Date.now() - start} ms`
	)
}

export async function watch(): Promise<void> {
	const buildOptions: BuildOptions = {
		callHook: false
	}
	await build(buildOptions)
	await hooks.callHook('on:dev@initial')

	let filesQueue: {
		updated?: string[]
		removed?: string[]
	} = { updated: [], removed: [] }

	const forceReload = async (folder: string): Promise<void> => {
		logger.info(
			`Changes in ${green(folder)} folder were detected. Reloading...`
		)
		await build(buildOptions)
		return await hooks.callHook('on:dev@reload')
	}

	const logQueue = (queue: string[], level: 'Updated' | 'Removed'): void => {
		if (queue.length === 0) return

		logger.info(
			level === 'Updated' ? cyan(level) : magenta(level),
			queue
				.map((path) => {
					return blackBright(`\n- ${path}`)
				})
				.join('')
				.toString()
		)
	}

	const reload = debounce(200, () => {
		console.clear()

		filesQueue.updated?.map(async (path) => {
			if (path.includes('components')) return forceReload('components')
			if (path.includes('collections')) return forceReload('collections')

			// Guard for whether the file is a module or an asset
			if (extname(path) === '.ts') {
				const content = await loadModule(path, false)
				fse.outputJSONSync(getPath(changeExt(path, '.json')), content, {
					spaces: '\t'
				})
			} else {
				fse.copySync(path, getPath(path))
			}
			await hooks.callHook('on:dev@reload')
		})

		filesQueue.removed?.map(async (path) => {
			if (path.includes('components')) return forceReload('components')
			if (path.includes('collections')) return forceReload('collections')

			await fse.remove(
				resolve(
					global.target.path,
					// Guard to ensure that TS files compiled to JSON will be removed
					extname(path) === '.ts'
						? changeExt(getPath(path), '.json')
						: getPath(path)
				)
			)
			await hooks.callHook('on:dev@reload')
		})

		logQueue(filesQueue.updated ?? [], 'Updated')
		logQueue(filesQueue.removed ?? [], 'Removed')

		filesQueue = { updated: [], removed: [] }
	})

	const watcher = chokidarWatch(global.config.packs.behaviorPack, {
		ignoreInitial: true
	})

	watcher.on('all', (event, path) => {
		switch (event) {
			case 'add':
			case 'change':
				if (filesQueue.updated?.includes(path)) break
				filesQueue.updated?.push(normalize(path))
				break

			case 'unlink':
				if (filesQueue.removed?.includes(path)) break
				filesQueue.removed?.push(normalize(path))
		}

		reload()
	})
}
