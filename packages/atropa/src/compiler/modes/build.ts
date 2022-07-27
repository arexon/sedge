import { logger } from '../../logger'
import {
	compileModule,
	copyFileToTarget,
	scanForPaths,
	transformScript
} from '../utils'

export async function build(options?: { allowHMR?: boolean }): Promise<void> {
	const startTime = Date.now()
	const { assets, modules, scripts } = scanForPaths({
		paths: [
			atropa.config.packs.behaviorPack,
			atropa.config.packs.resourcePack
		],
		ignorePaths: atropa.config.atropa.ignorePaths
	})

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			await compileModule(path, {
				allowHMR: options?.allowHMR || false
			})
		}),
		...scripts.map((path) => {
			transformScript(path)
		}),
		...assets.map((path) => {
			copyFileToTarget(path)
		})
	])

	if (atropa.mode === 'build') {
		const filesAmount = results.filter(
			(result) => result.status === 'fulfilled'
		).length
		logger.success(
			`Compiled ${filesAmount} files in ${Date.now() - startTime}ms`
		)
	}
}
