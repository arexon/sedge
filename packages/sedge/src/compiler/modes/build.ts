import { logger } from '../../logger'
import { copyFileToTarget } from '../fs'
import { compileModule, compileScripts } from '../module'
import { scanForPaths } from '../path'

export async function build(options?: { enableHMR?: boolean }): Promise<void> {
	const startTime = Date.now()
	const { assets, modules } = scanForPaths({
		paths: [
			sedge.config.packs.behaviorPack,
			sedge.config.packs.resourcePack
		],
		ignorePaths: sedge.config.sedge.ignorePaths
	})

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			await compileModule(path, options)
		}),
		...assets.map((path) => {
			copyFileToTarget(path)
		}),
		compileScripts({
			incremental: false
		})
	])

	if (sedge.mode === 'build') {
		const filesAmount = results.filter(
			(result) => result.status === 'fulfilled'
		).length
		logger.success(
			`Compiled ${filesAmount} files in ${Date.now() - startTime}ms`
		)
	}
}
