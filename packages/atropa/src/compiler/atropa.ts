import { blue, yellow, blackBright, magenta } from 'colorette'
import { hasOwnProperty } from '@antfu/utils'
import { loadConfig, type Config } from '../loader/config'
import { build, dev } from './modes'
import { prepareFolder } from './utils/fs'
import { getComMojangPath } from './utils/path'
import { logger } from '../logger'
import { comMojangFolder } from './constants'

export interface Atropa {
	config: Config
	mode: 'dev' | 'build'
	target: {
		name: string
		path: string
	}
	isComMojang: boolean
}

export async function createAtropa(options: {
	mode: 'dev' | 'build'
	target: string
}): Promise<void> {
	try {
		const atropa: Atropa = {
			config: await loadConfig(),
			mode: options.mode,
			target: {
				name: options.target,
				path: ''
			},
			isComMojang: false
		}
		const modeIsDev = atropa.mode === 'dev'
		const targetIsDefault = atropa.target.name === 'default'
		const defaultTargetPath =
			modeIsDev && targetIsDefault
				? comMojangFolder
				: atropa.config.atropa.targets.default

		if (defaultTargetPath === comMojangFolder && modeIsDev) {
			atropa.isComMojang = true
		} else if (defaultTargetPath === null && modeIsDev) {
			throw new Error(
				[
					`Could not find ${blue('com.mojang')} folder`,
					`Please set the ${blue(
						'LOCALAPPDATA'
					)} environment variable, or ensure that Minecraft is properly installed`
				].join('\n')
			)
		}

		const targetIsConfigured = hasOwnProperty(
			atropa.config.atropa.targets,
			atropa.target.name
		)

		process._namespace = atropa.config.name
		process._packs = atropa.config.packs
		process._minify = atropa.mode === 'build' && atropa.config.atropa.minify
		atropa.target.path =
			atropa.config.atropa.targets[atropa.target.name] ||
			defaultTargetPath!

		if (targetIsConfigured || targetIsDefault) {
			await runWithMode(atropa)
		} else {
			throw new Error(
				`Target ${yellow(
					options.target
				)} does not match any target in ${blackBright(
					'config.atropa.targets'
				)}`
			)
		}
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}
}

async function runWithMode(atropa: Atropa): Promise<void> {
	logger.info(
		`Via target ${magenta(atropa.target.name)} @ ${blackBright(
			atropa.target.path
		)}`
	)

	await prepare(atropa)
	switch (atropa.mode) {
		case 'build':
			await build(atropa, true)
			break
		case 'dev':
			await dev(atropa)
			break
	}
}

async function prepare(atropa: Atropa): Promise<void> {
	if (atropa.isComMojang) {
		await prepareFolder(
			getComMojangPath({
				packType: 'BP',
				projectName: atropa.config.name,
				targetPath: atropa.target.path
			})
		)
		await prepareFolder(
			getComMojangPath({
				packType: 'RP',
				projectName: atropa.config.name,
				targetPath: atropa.target.path
			})
		)
	} else {
		await prepareFolder(atropa.target.path)
	}
}
