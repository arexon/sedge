import fs from 'fs-extra'
import { normalize, resolve } from 'pathe'
import { watch as chokidarWatch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import { VolarsInstance } from '../volars'
import { build } from './build'
import { writeJson, loadModule, removeFile } from '../fileSystem'

export async function watch(volars: VolarsInstance): Promise<void> {
	await build(volars)

	interface FilesQueue {
		updated?: string[]
		removed?: string[]
	}
	let filesQueue: FilesQueue = { updated: [], removed: [] }

	const reload = debounce(async () => {
		filesQueue.updated!.map(async (path) => {
			if (path.endsWith('.ts')) {
				const content: string = await loadModule(resolve(path))
				await writeJson(
					resolve(volars.config.volars.target, path),
					content
				)
			} else {
				fs.copySync(path, resolve(volars.config.volars.target, path))
			}
		})

		filesQueue.removed!.map(async (path) => {
			await removeFile(resolve(volars.config.volars.target, path))
		})

		console.clear()
		volars.logger.success(filesQueue)

		filesQueue = { updated: [], removed: [] }
	}, 100)

	const watcher = chokidarWatch(volars.config.packs.behaviorPack, {
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
