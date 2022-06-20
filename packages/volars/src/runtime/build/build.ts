import fs from 'fs-extra'
import { resolve } from 'pathe'
import { writeJson, getModulesBatch, loadModule, getFilesBatch } from '../file'
import type { VolarsInstance } from '../volars'

export async function build(volars: VolarsInstance): Promise<void> {
	const start = Date.now()

	const modules = await getModulesBatch(volars.config.packs)
	const files = await getFilesBatch(volars.config.packs)

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			const content: string = await loadModule(resolve(path))

			await writeJson(resolve(volars.config.volars.target, path), content)
		}),
		...files.map(async (path) => {
			fs.copySync(path, resolve(volars.config.volars.target, path))
		})
	])

	volars.logger.success(
		`Compiled ${results.length} files in ${Date.now() - start} ms`
	)
}
