import { hasOwnProperty } from '@antfu/utils'
import { blackBright, blue, magenta, yellow } from 'colorette'
import { loadConfig } from '../config'
import { logger } from '../logger'
import { comMojangFolder } from './constants'
import { build, dev } from './modes'
import { getComMojangPathByPack, prepareFolder } from './utils'

export async function createAtropa(options: {
	mode: 'dev' | 'build'
	target: string
}): Promise<void> {
	try {
		global.atropa = {
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

		atropa.target.path =
			atropa.config.atropa.targets[atropa.target.name] ||
			defaultTargetPath!

		if (targetIsConfigured || targetIsDefault) {
			await runWithMode()
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

async function runWithMode(): Promise<void> {
	logger.info(
		`Via target ${magenta(atropa.target.name)} @ ${blackBright(
			atropa.target.path
		)}`
	)

	await prepare()
	switch (atropa.mode) {
		case 'build':
			await build()
			break
		case 'dev':
			await dev()
			break
	}
}

async function prepare(): Promise<void> {
	if (atropa.isComMojang) {
		await prepareFolder(getComMojangPathByPack('BP'))
		await prepareFolder(getComMojangPathByPack('RP'))
	} else {
		await prepareFolder(atropa.target.path)
	}
}
