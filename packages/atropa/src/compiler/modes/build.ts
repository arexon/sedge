import { hooks } from '../../core/hooks'
import { logger } from '../../logger'
import { compileModule, copyFileToTarget, scanForPaths } from '../utils'

export async function build(callHook: boolean): Promise<void> {
	const startTime = Date.now()
	const { assets, modules } = scanForPaths({
		paths: [
			atropa.config.packs.behaviorPack,
			atropa.config.packs.resourcePack
		],
		ignorePaths: atropa.config.atropa.ignorePaths
	})

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			await compileModule(path, { allowHMR: false })
		}),
		...assets.map((path) => {
			copyFileToTarget(path)
		}),
		callHook && (await hooks.callHook('on:build'))
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
