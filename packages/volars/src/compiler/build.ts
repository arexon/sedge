import jiti from 'jiti'
import { resolve } from 'path'
import { globby } from 'globby'
import { watch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import type { Packs, Volars } from '../types/volars'

export async function build(volars: Volars): Promise<void> {
	return volars.dev ? _watch(volars) : _build(volars)
}

async function _build(volars: Volars): Promise<void> {
	const files = await getAllFiles(volars.config.packs)

	volars.logger.start('Building the project...')

	const start = Date.now()
	const results = await Promise.allSettled(files.map(async (file) => await executeFile(file)))

	volars.logger.success(`Compiled ${results.length} files in ${Date.now() - start} ms`)
}

async function _watch(volars: Volars): Promise<void> {
	interface WatchedFilesQueue {
		updated?: string[]
		deleted?: string[]
	}

	volars.logger.start('Watching the project...')

	let watchedFilesQueue: WatchedFilesQueue = { updated: [], deleted: [] }

	const reload = debounce(async () => {
		await Promise.all(
			watchedFilesQueue.updated!.map(async (file) => {
				await executeFile(file)
			})
		)

		volars.logger.success(watchedFilesQueue)

		watchedFilesQueue = { updated: [], deleted: [] }
	}, 0)

	watch(volars.config.packs.behaviorPack, {
		ignoreInitial: true
	}).on('all', async (event, path) => {
		if (event === 'change' || event === 'add') {
			watchedFilesQueue.updated?.push(getAboslutePath(path))
		} else if (event === 'unlink') {
			watchedFilesQueue.deleted?.push(getAboslutePath(path))
		}

		await reload()
	})
}

function getAboslutePath(path: string): string {
	return resolve(process.cwd(), path).replace(/\\/g, '/')
}

async function getAllFiles(packs: Packs): Promise<string[]> {
	return await globby([getAboslutePath(`${packs.behaviorPack}/blocks/*.block.ts`)])
}

async function executeFile(file: string): Promise<void> {
	await jiti('', { interopDefault: true })(file)
}
