import fs from 'fs-extra'
import { globby } from 'globby'
import { join, resolve } from 'pathe'
import { logger } from '../logger'
import { tryImport, writeJsonFile } from './utils'

export async function build(): Promise<void> {
	const start = Date.now()

	const modules = await globby(
		join(global.config.packs.behaviorPack, '*/*.ts')
	)
	const files = await globby(join(global.config.packs.behaviorPack, '**/*'), {
		ignore: ['**/*.ts']
	})

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			const contents = await tryImport(resolve(path))
			await writeJsonFile(resolve(global.target.path, path), contents)
		}),
		...files.map(async (path) => {
			await fs.copy(path, resolve(global.target.path, path))
		})
	])
	const successResults = results.filter(
		(result) => result.status === 'fulfilled'
	)

	logger.success(
		`Compiled ${successResults.length} files in ${Date.now() - start} ms`
	)
}
