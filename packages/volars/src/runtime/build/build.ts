import { resolve } from 'pathe'
import { writeJson, getFilesBatch, loadModule } from '../file'
import type { VolarsInstance } from '../volars'

export async function build(volars: VolarsInstance): Promise<void> {
	const start = Date.now()

	const files = await getFilesBatch(volars.config.packs!)

	const results = await Promise.allSettled(
		files.map(async (path) => {
			const content: string = await loadModule(resolve(path))

			await writeJson(resolve(volars.config.volars.target, path), content)
		})
	)

	volars.logger.success(
		`Compiled ${results.length} files in ${Date.now() - start} ms`
	)
}
