import fse from 'fs-extra'
import type { Atropa } from '../atropa'
import {
	scanForPaths,
	resolveToTargetPath,
	replaceExt,
	importModule
} from '../utils'
import { logger } from '../../logger'
import { hooks } from '../../core/api/hooks'

export async function build(atropa: Atropa, callHook: boolean): Promise<void> {
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
				resolveToTargetPath(replaceExt(path, '.json'), atropa),
				content,
				minify ? undefined : { spaces: '\t' }
			)
		}),
		...assets.map((path) => {
			fse.copySync(path, resolveToTargetPath(path, atropa))
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
