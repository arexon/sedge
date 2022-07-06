import fse from 'fs-extra'
import { extname, join, resolve } from 'pathe'
import { type BinaryLike, createHash } from 'crypto'
import { logger } from '../logger'
import chalk from 'chalk'

export async function prepareDir(path: string): Promise<void> {
	await fse.remove(path)
	await fse.mkdir(path)
}

export function changeExt(path: string, extension: string): string {
	return path.replace(extname(path), extension)
}

export function getHash(source: BinaryLike): string {
	return createHash('sha256').update(source).digest('hex').slice(0, 8)
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
