import { debounce } from '@antfu/utils'
import { watch } from 'chokidar'
import { blackBright, cyan, green, magenta } from 'colorette'
import fse from 'fs-extra'
import { extname, normalize, resolve } from 'pathe'
import { hooks } from '../../core/hooks'
import { logger } from '../../logger'
import { importModule, replaceExt, resolveToTargetPath } from '../utils'
import { build } from './build'

export async function dev(): Promise<void> {
	await build(false)
	await hooks.callHook('on:dev@initial')

	const updatedFiles = new Set<string>()
	const removedFiles = new Set<string>()

	const isModule = (path: string): boolean => extname(path) === '.ts'
	const forceReload = async (folder: string): Promise<void> => {
		logger.info(`Changes in ${green(folder)} folder, reloading...`)
		await build(false)
		return await hooks.callHook('on:dev@reload')
	}

	const reload = debounce(200, async () => {
		console.clear()

		for (const path in updatedFiles) {
			if (path.includes('components')) return forceReload('components')
			if (path.includes('collections')) return forceReload('collections')

			if (isModule(path)) {
				const content = await importModule(path, false)
				fse.outputJSONSync(
					resolveToTargetPath(replaceExt(path, '.json')),
					content,
					{ spaces: '\t' }
				)
			} else {
				fse.copySync(path, resolveToTargetPath(path))
			}
		}

		for (const path in removedFiles) {
			if (path.includes('components')) return forceReload('components')
			if (path.includes('collections')) return forceReload('collections')

			await fse.remove(
				resolve(
					atropa.target.path,
					isModule(path)
						? replaceExt(resolveToTargetPath(path), '.json')
						: resolveToTargetPath(path)
				)
			)
		}

		logger.success(
			prettyPrintChanges({
				paths: Array.from(updatedFiles),
				level: 'Updated',
				color: 'cyan'
			})
		)
		logger.success(
			prettyPrintChanges({
				paths: Array.from(removedFiles),
				level: 'Removed',
				color: 'magenta'
			})
		)
		updatedFiles.clear()
		removedFiles.clear()

		await hooks.callHook('on:dev@reload')
	})

	const watcher = watch(
		[atropa.config.packs.behaviorPack, atropa.config.packs.resourcePack],
		{ ignoreInitial: true }
	)

	watcher.on('all', (event, path) => {
		switch (event) {
			case 'add':
			case 'change':
				if (updatedFiles.has(path)) break
				updatedFiles.add(normalize(path))
				break

			case 'unlink':
				if (removedFiles.has(path)) break
				removedFiles.add(normalize(path))
		}
		reload()
	})
}

function prettyPrintChanges(options: {
	paths: string[]
	level: string
	color: 'cyan' | 'magenta'
}): string[] {
	return [
		options.color === 'cyan' ? cyan(options.level) : magenta(options.level),
		options.paths
			.map((path) => {
				return blackBright(`\n- ${path}`)
			})
			.join('')
			.toString()
	]
}
