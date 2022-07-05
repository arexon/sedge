import fs from 'fs-extra'
import chalk from 'chalk'
import { globbySync } from 'globby'
import { debounce } from '@antfu/utils'
import { transformFileSync } from '@swc/core'
import { watch as chokidarWatch } from 'chokidar'
import { join, normalize, resolve, extname } from 'pathe'
import { logger } from '../logger'
import { changeExt, loadModule, resolveImports, writeJsonFile } from './utils'

export async function build(silent = false): Promise<void> {
	const start = Date.now()

	const modules = globbySync(
		join(global.config.packs.behaviorPack, '*/*.ts'),
		{ ignore: ['**/components/**'] }
	)
	const assets = globbySync(join(global.config.packs.behaviorPack, '**/*'), {
		ignore: ['**/*.ts']
	})

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			const content = await loadModule(path)
			writeJsonFile(resolve(global.target.path, path), content)
		}),
		...assets.map((path) => {
			fs.copySync(path, resolve(global.target.path, path))
		})
	])

	if (silent) return

	const successResults = results.filter(
		(result) => result.status === 'fulfilled'
	)
	logger.success(
		`Compiled ${successResults.length} files in ${Date.now() - start} ms`
	)
}

export async function watch(): Promise<void> {
	await build(true)

	let filesQueue: {
		updated?: string[]
		removed?: string[]
	} = { updated: [], removed: [] }

	const logReload = () => {
		logger.info(
			'Changes in',
			chalk.cyan('components'),
			'folder were detected. Reloading...'
		)
	}
	const logQueue = (queue: string[], level: 'Updated' | 'Removed'): void => {
		if (queue.length === 0) return

		logger.info(
			level === 'Updated' ? chalk.cyan(level) : chalk.magenta(level),
			queue
				.map((path) => {
					return chalk.blackBright(`\n- ${path}`)
				})
				.join('')
				.toString()
		)
	}

	const reload = debounce(200, () => {
		console.clear()

		filesQueue.updated?.map(async (path) => {
			// Reload if the file is in the components folder
			if (path.includes('/components/')) {
				logReload()
				return await build(true)
			}

			// Guard for whether the file is a module or an asset
			if (extname(path) === '.ts') {
				const content = await loadModule(path, true)
				writeJsonFile(resolve(global.target.path, path), content)
			} else {
				fs.copySync(path, resolve(global.target.path, path))
			}
		})

		filesQueue.removed?.map(async (path) => {
			// Reload if the file is in the components folder
			if (path.includes('/components/')) {
				logReload()
				return await build(true)
			}

			await fs.remove(
				resolve(
					global.target.path,
					// Guard to ensure that TS files compiled to JSON will be removed
					extname(path) === '.ts' ? changeExt(path, '.json') : path
				)
			)
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

export function transpileModules(path: string): void {
	const modules = globbySync(join(global.config.packs.behaviorPack, '*/*.ts'))

	modules.map(async (modulePath) => {
		const file = transformFileSync(modulePath)
		fs.outputFileSync(
			resolve(path, changeExt(modulePath, '.js')),
			await resolveImports(file.code, {
				url: resolve(path, modulePath)
			})
		)
	})
}
