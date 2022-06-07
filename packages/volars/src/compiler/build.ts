import jiti from 'jiti'
import { resolve } from 'path'
import { globby } from 'globby'
import { logger } from './logger'
import { loadVolarsConfig, type Packs } from '../config'

export async function build(): Promise<void> {
	const config = await loadVolarsConfig()
	const files = await getAllFiles(config.packs!)

	logger.start('Building the project...')

	const start = Date.now()
	const results = await Promise.allSettled(
		files.map(async (file) => {
			await jiti('', { interopDefault: true })(file)
		})
	)

	logger.success(`Compiled ${results.length} files in ${Date.now() - start} ms`)
}

function getAboslutePath(path: string): string {
	return resolve(process.cwd(), path)
}

async function getAllFiles(packs: Packs): Promise<string[]> {
	return await globby([
		getAboslutePath(`${packs.behaviorPack}/blocks/*.block.ts`).replace(/\\/g, '/')
	])
}
