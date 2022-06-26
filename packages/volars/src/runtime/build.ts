import fs from 'fs-extra'
import { resolve } from 'pathe'
import { logger } from '../logger'
import { writeJson, getModules, loadModule, getFiles } from './fs'

export async function build(): Promise<void> {
	const start = Date.now()

	const modules = await getModules(global.config.packs)
	const files = await getFiles(global.config.packs)

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			const content: string = await loadModule(resolve(path))

			await writeJson(resolve(global.target.path, path), content)
		}),
		...files.map(async (path) => {
			fs.copySync(path, resolve(global.target.path, path))
		})
	])

	logger.success(
		`Compiled ${results.length} files in ${Date.now() - start} ms`
	)
}
