import jiti from 'jiti'
import { resolve } from 'path'
import { globby } from 'globby'
import { Packs, Volars } from '../types/volars'

export async function build(volars: Volars): Promise<void> {
	return volars.dev ? _watch(volars) : _build(volars)
}

async function _build(volars: Volars): Promise<void> {
	const files = await getAllFiles(volars.config.packs)

	volars.logger.start('Building the project...')

	const start = Date.now()
	const results = await Promise.allSettled(
		files.map(async (file) => {
			await jiti('', { interopDefault: true })(file)
		})
	)

	volars.logger.success(`Compiled ${results.length} files in ${Date.now() - start} ms`)
}

async function _watch(volars: Volars): Promise<void> {
	volars.logger.start('Watching the project...')
}

function getAboslutePath(path: string): string {
	return resolve(process.cwd(), path)
}

async function getAllFiles(packs: Packs): Promise<string[]> {
	return await globby([
		getAboslutePath(`${packs.behaviorPack}/blocks/*.block.ts`).replace(/\\/g, '/')
	])
}
