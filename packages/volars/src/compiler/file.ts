import jiti from 'jiti'
import { join } from 'pathe'
import { globby } from 'globby'
import { mkdirs, remove, writeFile } from 'fs-extra'
import type { Packs } from '../config'

export async function getFilesBatch(packs: Packs): Promise<string[]> {
	const blocks = await globby(`${packs.behaviorPack}/blocks/**/*.ts`)

	return [...blocks]
}

export async function loadFile(path: string): Promise<unknown> {
	return await jiti('', { interopDefault: true, requireCache: false })(path)
}

export async function createFile(path: string, content: string): Promise<void> {
	await mkdirs(getPathWithoutFileName(path))

	await writeFile(getPathWithJsonExtension(path), JSON.stringify(content, null, '\t'))
}

export async function removeFile(path: string): Promise<void> {
	await remove(getPathWithJsonExtension(path))
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

function getPathWithoutFileName(path: string): string {
	return path.replace(/\/[^\/]+?\.[^\/]+?$/, '/')
}
