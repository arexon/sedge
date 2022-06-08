import fs from 'fs-extra'
import { resolve } from 'pathe'
import { globby } from 'globby'
import { watch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import type { TSConfig } from 'pkg-types'
import type { FileTable, FileType, Packs, Volars } from '../types/volars'
import { blockTypes } from './typeTemplates'

export async function build(volars: Volars): Promise<void> {
	return volars.dev ? _watch(volars) : _build(volars)
}

async function _build(volars: Volars): Promise<void> {
	volars.logger.start('Building the project...')

	await generateTypes()
	volars.logger.success('Generated types')

	const blocksBatch = await getFileBatch(volars, 'block')

	await prepareDir(resolve('build'))

	const start = Date.now()
	const results = await Promise.allSettled(
		blocksBatch.map(async ({ path, type }) => await writeFileFrom(path, type, volars))
	)

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
				await writeFileFrom(file, 'block', volars)
			})
		)

		volars.logger.success(watchedFilesQueue)

		watchedFilesQueue = { updated: [], deleted: [] }
	}, 0)

	watch(volars.config.packs.behaviorPack, {
		ignoreInitial: true
	}).on('all', async (event, path) => {
		if (event === 'change' || event === 'add') {
			watchedFilesQueue.updated?.push(resolve(path))
		} else if (event === 'unlink') {
			watchedFilesQueue.deleted?.push(resolve(path))
		}

		await reload()
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

async function getFileBatch(volars: Volars, type: FileType): Promise<FileTable[]> {
	return (await globby(`${volars.config.packs.behaviorPack}/${type}s/*.ts`)).map((path) => ({
		path: resolve(path),
		type
	}))
}

function getFileNameWithoutExtension(path: string): string {
	return path
		.split('/')
		.pop()!
		.replace(/\.[^/.]+$/, '')
}

async function writeFileFrom(path: string, type: FileType, volars: Volars): Promise<void> {
	const file = await import(path)
	const base = resolve(`${volars.config.buildDir}/BP/${type}s`)

	await fs.mkdirs(base)

	await fs.writeFile(
		`${base}/${getFileNameWithoutExtension(path)}.json`,
		JSON.stringify(file, null, '\t')
	)
}
