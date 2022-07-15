import { magenta, blackBright } from 'colorette'
import { join } from 'pathe'
import { prepareDir } from './utils'
import { build, watch } from './build'
import { logger } from '../logger'

export async function start(mode: 'build' | 'dev'): Promise<void> {
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
		magenta(global.target.name),
		'at',
		blackBright(global.target.path)
	)

	if (mode === 'build') {
		logger.start('Building the project...')
		await build()
	} else if (mode === 'dev') {
		logger.start('Watching the project...')
		await watch()
	}
}
