import { logger } from '../../logger'
import {
	compileModule,
	compileScripts,
	copyFileToTarget,
	scanForPaths
} from '../utils'

export async function build(options?: { allowHMR?: boolean }): Promise<void> {
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
			await compileModule(path, {
				allowHMR: options?.allowHMR || false
			})
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
