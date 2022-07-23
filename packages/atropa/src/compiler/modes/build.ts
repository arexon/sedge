import fse from 'fs-extra'
import { hooks } from '../../core/hooks'
import { logger } from '../../logger'
import {
	importModule,
	replaceExt,
	resolveToTargetPath,
	scanForPaths
} from '../utils'

export async function build(callHook: boolean): Promise<void> {
	const startTime = Date.now()
	const minify = atropa.mode === 'build' && atropa.config.atropa.minify
	const { assets, modules } = scanForPaths({
		paths: [
			atropa.config.packs.behaviorPack,
			atropa.config.packs.resourcePack
		],
		ignorePaths: atropa.config.atropa.ignorePaths
	})

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			const content = await importModule(path)
			fse.outputJSONSync(
				resolveToTargetPath(replaceExt(path, '.json')),
				content,
				minify ? undefined : { spaces: '\t' }
			)
		}),
		...assets.map((path) => {
			fse.copySync(path, resolveToTargetPath(path))
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
