import jiti from 'jiti'
import fs from 'fs-extra'
import { join } from 'pathe'
import { globby } from 'globby'
import type { Packs } from '../config'

export async function getModules(packs: Packs): Promise<string[]> {
	return await globby(`${packs.behaviorPack}/*/*.ts`)
}

export async function getFiles(packs: Packs): Promise<string[]> {
	return await globby(`${packs.behaviorPack}/**/*`, {
		ignore: ['**/*.ts']
	})
}

export async function loadModule(path: string): Promise<any> {
	return await jiti('', { interopDefault: true, requireCache: false })(path)
}

export async function writeJson(path: string, content: string): Promise<void> {
	await fs.outputJSON(getPathWithJsonExtension(path), content, {
		spaces: '\t'
	})
}

export async function removeFile(path: string): Promise<void> {
	await fs.remove(getPathWithJsonExtension(path))
}

export async function prepareDir(path: string): Promise<void> {
	await fs.remove(path)
	await fs.ensureDir(path)
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
