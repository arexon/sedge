import fse from 'fs-extra'
import { blackBright } from 'colorette'
import glob from 'fast-glob'
import { extname, join, resolve } from 'pathe'
import { logger } from '../logger'

export async function prepareDir(path: string): Promise<void> {
	await fse.remove(path)
	await fse.mkdir(path)
}

export function changeExt(path: string, extension: string): string {
	return path.replace(extname(path), extension)
}

export function getPath(path: string): string {
	const removeRelative = (path: string): string => {
		return path.replace(/^\.\//, '')
	}

	const isBP = path.includes(removeRelative(global.config.packs.behaviorPack))
	const isRP = path.includes(removeRelative(global.config.packs.resourcePack))

	const error = (): void => {
		logger.error(`Path ${blackBright(path)} is not in the correct folder.`)
		process.exit(1)
	}

	if (global.isComMojang) {
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
	const configIgnoredPaths = global.config.atropa?.ignorePaths || []
	const modules = glob.sync(joinPaths('**/*.ts'), {
		...(options.ignoreComponents && {
			ignore: ['**/components/**/*.ts', ...configIgnoredPaths]
		})
	})
	const assets = glob.sync(joinPaths('**/*'), {
		ignore: ['**/*.ts', ...configIgnoredPaths]
	})

	return { modules, assets }
}
