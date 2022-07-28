import { isObject } from '@antfu/utils'
import { build, type BuildResult } from 'esbuild'
import createJITI from 'jiti'
import { join, resolve } from 'pathe'
import { logger } from '../../logger'
import { atropaCacheFolder } from '../constants'
import { pathExists, writeFileToTarget, writeJsonFileToTarget } from './fs'
import { resolveToTargetPath } from './path'

type ModuleResult = {
	type: 'file' | 'collection'
	data: any
}

export async function compileModule(
	path: string,
	options: { allowHMR: boolean }
): Promise<void> {
	const result = await evalModule(resolve(path), options)

	switch (result.type) {
		case 'collection':
			for (const [path, content] of await result.data) {
				if (isObject(content)) {
					writeJsonFileToTarget(path, content)
					continue
				}
				writeFileToTarget(path, content)
			}
			break
		default:
			if (isObject(result)) writeJsonFileToTarget(path, result)
			else writeFileToTarget(path, result)
	}
}

export async function evalModule(
	path: string,
	options: { allowHMR: boolean }
): Promise<ModuleResult> {
	const jiti = createJITI('', {
		cache: atropaCacheFolder,
		requireCache: !options.allowHMR,
		interopDefault: true,
		onError: (error) => {
			logger.error(error.message)
			process.exit(1)
		}
	})
	return await jiti(path)
}

export async function compileScripts(options: {
	incremental: boolean
}): Promise<BuildResult | void> {
	const scriptFolder = join(atropa.config.packs.behaviorPack, 'scripts')

	if (!pathExists(join(scriptFolder, 'index.ts'))) return

	return await build({
		entryPoints: [resolve(scriptFolder, 'index.ts')],
		outfile: resolveToTargetPath(join(scriptFolder, 'index.js')),
		target: 'esnext',
		format: 'esm',
		bundle: true,
		minify: atropa.mode === 'build' && atropa.config.atropa.minify,
		incremental: options.incremental,
		external: ['mojang-minecraft', 'mojang-minecraft-ui', 'mojang-gametest']
	})
}
