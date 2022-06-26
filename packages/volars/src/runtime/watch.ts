import fs from 'fs-extra'
import { normalize, resolve } from 'pathe'
import { watch as chokidarWatch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import { build } from './build'
import { writeJson, loadModule, removeFile } from './fs'
import { logger } from '../logger'

export async function watch(): Promise<void> {
	await build()

	interface FilesQueue {
		updated?: string[]
		removed?: string[]
	}
	let filesQueue: FilesQueue = { updated: [], removed: [] }

	const reload = debounce(async () => {
		filesQueue.updated?.map(async (path) => {
			if (path.endsWith('.ts')) {
				const content: string = await loadModule(resolve(path))
				await writeJson(resolve(global.target.path, path), content)
			} else {
				fs.copySync(path, resolve(global.target.path, path))
			}
		})

		filesQueue.removed?.map(async (path) => {
			await removeFile(resolve(global.target.path, path))
		})

		console.clear()
		logger.success(filesQueue)

		filesQueue = { updated: [], removed: [] }
	}, 100)

	const watcher = chokidarWatch(global.config.packs.behaviorPack, {
		ignoreInitial: true
	})

	watcher.on('all', async (event, path) => {
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
