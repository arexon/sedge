import fs from 'fs-extra'
import jiti from 'jiti'
import { resolve, normalize, join } from 'pathe'
import { globby } from 'globby'
import { watch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import { blockTypes } from './typeTemplates'
import type { TSConfig } from 'pkg-types'
import type { Packs, Volars } from '../types/volars'

export async function build(volars: Volars): Promise<void> {
	await generateTypes()
	await prepareDir(resolve('build'))

	if (volars.dev) {
		volars.logger.start('Watching the project...')

		return await _watch(volars)
	} else {
		volars.logger.start('Building the project...')

		return await _build(volars)
	}
}

async function _build(volars: Volars): Promise<void> {
	const start = Date.now()

	const files = await getFileBatches(volars.config.packs!)

	const results = await Promise.allSettled(
		files.map(async (path) => {
			const content = await loadFile(resolve(path))

			await writeFile(resolve(volars.config.buildDir!, path), content as string)
		})
	)

	volars.logger.success(`Compiled ${results.length} files in ${Date.now() - start} ms`)
}

async function _watch(volars: Volars): Promise<void> {
	interface WatchedFilesQueue {
		updated?: string[]
		deleted?: string[]
	}

	await _build(volars)

	let watchedFilesQueue: WatchedFilesQueue = { updated: [], deleted: [] }

	const reload = debounce(async () => {
		watchedFilesQueue.updated!.map(async (file) => {
			const content = await loadFile(resolve(file))

			await writeFile(resolve(volars.config.buildDir!, file), content as string)
		})
		watchedFilesQueue.deleted!.map(async (file) => {
			await deleteFile(resolve(volars.config.buildDir!, file))
		})

		volars.logger.success(watchedFilesQueue)

		watchedFilesQueue = { updated: [], deleted: [] }
	}, 100)

	const watcher = watch(volars.config.packs!.behaviorPack, { ignoreInitial: true })

	watcher.on('all', async (event, path) => {
		if (!validatePath(volars, normalize(path))) return

		if (event === 'change' || event === 'add') {
			watchedFilesQueue.updated?.push(normalize(path))
		} else if (event === 'unlink') {
			watchedFilesQueue.deleted?.push(normalize(path))
		}

		reload()
	})
}

async function prepareDir(dir: string): Promise<void> {
	await fs.mkdir(dir, { recursive: true })
	await fs.emptyDir(dir)
}

async function generateTypes(): Promise<void> {
	await prepareDir(resolve('.volars'))

	await fs.writeFile(resolve('.volars/blockTypes.d.ts'), blockTypes, { encoding: 'utf8' })

	const tsConfig: TSConfig = {
		compilerOptions: {
			target: 'esnext',
			module: 'esnext',
			moduleResolution: 'node',
			strict: true,
			esModuleInterop: true
		},
		include: ['./blockTypes.d.ts', '../BP']
	}
	await fs.writeFile(resolve('.volars/tsconfig.json'), JSON.stringify(tsConfig, null, '\t'))
}

async function getFileBatches(packs: Packs): Promise<string[]> {
	const blocksBatch = await globby(`${packs.behaviorPack}/blocks/**/*.ts`)

	return [...blocksBatch]
}

function validatePath(volars: Volars, path: string): boolean {
	return path.search(`${volars.config.packs!.behaviorPack}/blocks`) === 0
}

function getPathWithoutFileName(path: string): string {
	return path.replace(/\/[^\/]+?\.[^\/]+?$/, '/')
}

function getPathWithJsonExtension(path: string): string {
	return join(
		getPathWithoutFileName(path),
		path
			.split('/')
			.pop()!
			.replace(/\.[^/.]+$/, '.json')
	)
}

async function loadFile(path: string): Promise<unknown> {
	return await jiti('', { interopDefault: true, requireCache: false })(path)
}

async function writeFile(path: string, content: string): Promise<void> {
	await fs.mkdirs(getPathWithoutFileName(path))

	await fs.writeFile(getPathWithJsonExtension(path), JSON.stringify(content, null, '\t'))
}

async function deleteFile(path: string): Promise<void> {
	await fs.remove(getPathWithJsonExtension(path))
}
