import chalk from 'chalk'
import { prepareDir } from './utils'
import { build, watch, transpileModules, generateTsConfig } from './build'
import { logger } from '../logger'
import { cacheDir, volarsDir } from '../constants'
import { join } from 'pathe'

export async function start(mode: 'build' | 'dev'): Promise<void> {
	await prepareDir(volarsDir)
	await transpileModules(cacheDir)

	if (global.target.name !== 'com.mojang') {
		await prepareDir(global.target.path)
	} else {
		await prepareDir(
			join(
				global.target.path,
				'development_behavior_packs',
				`${global.config.name} BP`
			)
		)
		await prepareDir(
			join(
				global.target.path,
				'development_resource_packs',
				`${global.config.name} RP`
			)
		)
	}

	if (Object.keys(global.config.volars?.aliases || {}).length > 0) {
		generateTsConfig(volarsDir)
	}

	logger.info(
		'Via target',
		chalk.magenta(global.target.name),
		'at',
		chalk.blackBright(global.target.path)
	)

	if (mode === 'build') {
		logger.start('Building the project...')
		return await build()
	} else {
		logger.start('Watching the project...')
		return await watch()
	}
}
