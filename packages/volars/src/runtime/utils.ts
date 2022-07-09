import fse from 'fs-extra'
import chalk from 'chalk'
import glob from 'fast-glob'
import createJITI from 'jiti'
import { extname, join, resolve } from 'pathe'
import { logger } from '../logger'
import { volarsCacheDir } from '../constants'

export async function prepareDir(path: string): Promise<void> {
	await fse.remove(path)
	await fse.mkdir(path)
}

export function changeExt(path: string, extension: string): string {
	return path.replace(extname(path), extension)
}

export function getPath(path: string, isInComMojang: boolean): string {
	const removeRelative = (path: string): string => {
		return path.replace(/^\.\//, '')
	}

	const isBP = path.includes(removeRelative(global.config.packs.behaviorPack))
	const isRP = path.includes(removeRelative(global.config.packs.resourcePack))

	const error = (): void => {
		logger.error(
			`Path ${chalk.blackBright(path)} is not in the correct folder.`
		)
		process.exit(1)
	}

	if (isInComMojang) {
		const comMojangBP = join(
			global.target.path,
			'development_behavior_packs',
			`${global.config.name} BP`
		)
		const comMojangRP = join(
			global.target.path,
			'development_resource_packs',
			`${global.config.name} RP`
		)

		if (isBP) {
			return path.replace(
				removeRelative(global.config.packs.behaviorPack),
				comMojangBP
			)
		} else if (isRP) {
			return path.replace(
				removeRelative(global.config.packs.resourcePack),
				comMojangRP
			)
		} else throw error()
	} else {
		if (isBP) {
			return resolve(global.target.path, path)
		} else if (isRP) {
			return resolve(global.target.path, path)
		} else throw error()
	}
}

export async function loadModule(path: string, cache = false): Promise<any> {
	const jiti = createJITI('', {
		cache: volarsCacheDir,
		requireCache: cache,
		interopDefault: true,
		sourceMaps: true,
		onError: (error) => {
			logger.error(error.message)
			process.exit(1)
		}
	})
	return await jiti(resolve(path))
}

interface ScanPathsOptions {
	paths: string[]
	ignoreComponents?: boolean
}

export function scanPaths(options: ScanPathsOptions): {
	modules: string[]
	assets: string[]
} {
	options = {
		ignoreComponents: true,
		...options
	}
	const joinPaths = (pattern: string): string[] => {
		return options.paths.map((path) => join(path, pattern))
	}
	const modules = glob.sync(joinPaths('**/*.ts'), {
		...(options.ignoreComponents && {
			ignore: ['**/components/**/*.ts']
		})
	})
	const assets = glob.sync(joinPaths('**/*'), {
		ignore: ['**/*.ts']
	})

	return { modules, assets }
}
