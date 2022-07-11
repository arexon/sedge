import chalk from 'chalk'
import { join } from 'pathe'
import { prepareDir } from './utils'
import { build, watch } from './build'
import { logger } from '../logger'
import { atropaDir } from '../constants'

export async function start(mode: 'build' | 'dev'): Promise<void> {
	await prepareDir(atropaDir)

	if (!global.isComMojang) {
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

	logger.info(
		'Via target',
		chalk.magenta(global.target.name),
		'at',
		chalk.blackBright(global.target.path)
	)

	if (mode === 'build') {
		logger.start('Building the project...')
		return await build()
	} else if (mode === 'dev') {
		logger.start('Watching the project...')
		return await watch()
	}
}
