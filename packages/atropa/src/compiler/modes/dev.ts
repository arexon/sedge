import { debounce } from '@antfu/utils'
import { watch } from 'chokidar'
import { blackBright, cyan, green, magenta } from 'colorette'
import { normalize } from 'pathe'
import { logger } from '../../logger'
import {
	compileModule,
	compileScripts,
	copyFileToTarget,
	isModule,
	removeFileFromTarget
} from '../utils'
import { build } from './build'

export async function dev(): Promise<void> {
	await build()

	const updatedFiles = new Set<string>()
	const removedFiles = new Set<string>()

	const reload = debounce(200, async () => {
		console.clear()

		const scripts = await compileScripts({
			incremental: true
		})

		for (const path of updatedFiles) {
			if (path.includes('components')) {
				clearSets(updatedFiles, removedFiles)
				forceReload('components')
				return
			}
			if (path.includes('collections')) {
				clearSets(updatedFiles, removedFiles)
				forceReload('collections')
				return
			}

			if (isModule(path)) {
				await compileModule(path, { allowHMR: true })
			} else {
				copyFileToTarget(path)
			}
		}

		for (const path of removedFiles) {
			if (path.includes('components')) {
				clearSets(updatedFiles, removedFiles)
				forceReload('components')
				return
			}
			if (path.includes('collections')) {
				clearSets(updatedFiles, removedFiles)
				forceReload('collections')
				return
			}

			removeFileFromTarget(path)
		}

		await scripts.rebuild!()

		logChanges(Array.from(updatedFiles), 'Updated', 'cyan')
		logChanges(Array.from(removedFiles), 'Removed', 'magenta')
		clearSets(updatedFiles, removedFiles)
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

async function forceReload(folder: string): Promise<void> {
	logger.info(`Changes in ${green(folder)} folder, reloading...`)
	await build({ allowHMR: true })
	logger.info(`Reload complete`)
}

function clearSets(...sets: Set<string>[]): void {
	sets.forEach((set) => set.clear())
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
