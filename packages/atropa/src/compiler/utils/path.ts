import { blackBright } from 'colorette'
import glob from 'fast-glob'
import { extname, join, resolve } from 'pathe'
import { logger } from '../../logger'

export function replaceExt(path: string, newExt: string): string {
	return path.replace(extname(path), newExt)
}

export function scanForPaths(options: {
	paths: string[]
	ignorePaths?: string[]
}): {
	modules: string[]
	assets: string[]
} {
	const addPatternToPaths = (pattern: string): string[] => {
		return options.paths.map((path) => join(path, pattern))
	}
	const modules = glob.sync(addPatternToPaths('**/*.ts'), {
		ignore: ['**/components/**/*.ts', ...(options.ignorePaths || [])]
	})
	const assets = glob.sync(addPatternToPaths('**/*'), {
		ignore: ['**/*.ts', ...(options.ignorePaths || [])]
	})
	return { modules, assets }
}

export function resolveToTargetPath(path: string): string {
	const pathToBP = atropa.config.packs.behaviorPack
	const pathToRP = atropa.config.packs.resourcePack
	const isBP = path.endsWith(pathToBP)
	const isRP = path.endsWith(pathToRP)

	const error = (): void => {
		logger.error(`Path ${blackBright(path)} is not in the correct pack`)
		process.exit(1)
	}

	if (atropa.isComMojang) {
		if (isBP) return path.replace(pathToBP, getComMojangPathByPack('BP'))
		else if (isRP)
			return path.replace(pathToRP, getComMojangPathByPack('RP'))
		else throw error()
	}

	if (isBP) return resolve(atropa.target.path, path)
	else if (isRP) return resolve(atropa.target.path, path)
	else throw error()
}

export function getComMojangPathByPack(packType: 'BP' | 'RP'): string {
	return join(
		atropa.target.path,
		`development_${packType === 'BP' ? 'behavior' : 'resource'}_packs`,
		`${atropa.config.name} ${packType}`
	)
}
