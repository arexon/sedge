import { debounce } from '@antfu/utils'
import { watch } from 'chokidar'
import { blackBright, cyan, green, magenta } from 'colorette'
import { normalize } from 'pathe'
import { hooks } from '../../core/hooks'
import { logger } from '../../logger'
import {
	copyFileToTarget,
	importModule,
	isModule,
	removeFileFromTarget,
	writeJsonFileToTarget
} from '../utils'
import { build } from './build'

export async function dev(): Promise<void> {
	await build(false)
	await hooks.callHook('on:dev@initial')

	const updatedFiles = new Set<string>()
	const removedFiles = new Set<string>()

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
				writeJsonFileToTarget(path, content)
			} else {
				copyFileToTarget(path)
			}
		}

		for (const path in removedFiles) {
			if (path.includes('components')) return forceReload('components')
			if (path.includes('collections')) return forceReload('collections')

			removeFileFromTarget(path)
		}

		logChanges(Array.from(updatedFiles), 'Updated', 'cyan')
		logChanges(Array.from(removedFiles), 'Removed', 'magenta')
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

function logChanges(
	paths: string[],
	level: string,
	color: 'cyan' | 'magenta'
): void {
	if (paths.length === 0) return

	logger.success(
		color === 'cyan' ? cyan(level) : magenta(level),
		paths
			.map((path) => {
				return blackBright(`\n- ${path}`)
			})
			.join('')
			.toString()
	)
}
