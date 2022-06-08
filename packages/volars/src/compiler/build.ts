import fs from 'fs-extra'
import { resolve } from 'path'
import { globby } from 'globby'
import { watch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import type { TSConfig } from 'pkg-types'
import type { Packs, Volars } from '../types/volars'
import { blockTypes } from './typeTemplates'

export async function build(volars: Volars): Promise<void> {
	return volars.dev ? _watch(volars) : _build(volars)
}

async function _build(volars: Volars): Promise<void> {
	const files = await getAllFiles(volars.config.packs)

	volars.logger.start('Building the project...')

	await generateTypes()

	volars.logger.success('Generated types')

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

	await generateTypes()

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

async function prepareDir(dir: string): Promise<void> {
	await fs.mkdir(dir, { recursive: true })
	await fs.emptyDir(dir)
}

async function generateTypes(): Promise<void> {
	await prepareDir(getAboslutePath('.volars'))

	await fs.writeFile(getAboslutePath('.volars/blockTypes.d.ts'), blockTypes, { encoding: 'utf8' })

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
	await fs.writeFile(
		getAboslutePath('.volars/tsconfig.json'),
		JSON.stringify(tsConfig, null, '\t')
	)
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
