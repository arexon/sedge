import { normalize, resolve } from 'pathe'
import { watch as chokidarWatch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import { VolarsInstance } from '../volars'
import { build } from './build'
import { createFile, loadFile, removeFile } from '../file'

export async function watch(volars: VolarsInstance): Promise<void> {
	interface FilesQueue {
		updated?: string[]
		removed?: string[]
	}

	await build(volars)

	let filesQueue: FilesQueue = { updated: [], removed: [] }

	const reload = debounce(async () => {
		filesQueue.updated!.map(async (file) => {
			const content = await loadFile(resolve(file))

			await createFile(resolve(volars.config.volars.target!, file), content as string)
		})

		filesQueue.removed!.map(async (file) => {
			await removeFile(resolve(volars.config.volars.target!, file))
		})

		volars.logger.success(filesQueue)

		filesQueue = { updated: [], removed: [] }
	}, 100)

	const watcher = chokidarWatch(volars.config.packs!.behaviorPack, { ignoreInitial: true })

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
