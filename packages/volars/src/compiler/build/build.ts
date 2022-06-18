import { resolve } from 'pathe'
import { createFile, getFilesBatch, loadFile } from '../file'
import type { VolarsInstance } from '../volars'

export async function build(volars: VolarsInstance): Promise<void> {
	const start = Date.now()

	const files = await getFilesBatch(volars.config.packs!)

	const results = await Promise.allSettled(
		files.map(async (path) => {
			const content = await loadFile(resolve(path))

			await createFile(resolve(volars.config.volars.target!, path), content as string)
		})
	)

	volars.logger.success(`Compiled ${results.length} files in ${Date.now() - start} ms`)
}
