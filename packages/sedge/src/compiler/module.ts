import { isObject } from '@antfu/utils'
import { build, type BuildResult } from 'esbuild'
import createJITI from 'jiti'
import { join, resolve } from 'pathe'
import { logger } from '../logger'
import { cacheDir } from './constants'
import { pathExists, writeFileToTarget, writeJsonFileToTarget } from './fs'
import { replaceExt, resolveToTargetPath } from './path'

type ModuleResult = {
	type: 'json' | 'mcfunction' | 'collection'
	data: any
}

export async function compileModule(
	path: string,
	options?: { enableHMR?: boolean }
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
		case 'mcfunction':
			writeFileToTarget(path, result.data, {
				extension: '.mcfunction'
			})
			break
		case 'json':
			writeJsonFileToTarget(path, result.data)
			break
		default:
			if (isObject(result)) writeJsonFileToTarget(path, result)
			else writeFileToTarget(path, result)
	}
}

export async function evalModule(
	path: string,
	options?: { enableHMR?: boolean }
): Promise<ModuleResult> {
	const { enableHMR = false } = options || {}
	const jiti = createJITI('', {
		cache: cacheDir,
		requireCache: !enableHMR,
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
	const scriptDir = join(sedge.config.packs.behaviorPack, 'scripts')
	const scriptEntryName = sedge.config.sedge.scriptEntryName

	if (!pathExists(join(scriptDir, scriptEntryName))) return

	return await build({
		entryPoints: [resolve(scriptDir, scriptEntryName)],
		outfile: resolveToTargetPath(
			join(scriptDir, replaceExt(scriptEntryName, '.js'))
		),
		target: 'esnext',
		format: 'esm',
		bundle: true,
		minify: sedge.mode === 'build' && sedge.config.sedge.minify,
		incremental: options.incremental,
		external: ['mojang-minecraft', 'mojang-minecraft-ui', 'mojang-gametest']
	})
}
