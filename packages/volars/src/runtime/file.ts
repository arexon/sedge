import jiti from 'jiti'
import { join } from 'pathe'
import { globby } from 'globby'
import fs from 'fs-extra'
import type { Packs } from '../config'

export async function getFilesBatch(packs: Packs): Promise<string[]> {
	const blocks = await globby(`${packs.behaviorPack}/blocks/**/*.ts`)

	return [...blocks]
}

export async function loadModule(
	path: string,
	requireCache = false
): Promise<any> {
	return await jiti('', { interopDefault: true, requireCache })(path)
}

export async function writeJson(path: string, content: string): Promise<void> {
	await fs.outputJSON(getPathWithJsonExtension(path), content, {
		spaces: '\t'
	})
}

export async function removeFile(path: string): Promise<void> {
	await fs.remove(getPathWithJsonExtension(path))
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
