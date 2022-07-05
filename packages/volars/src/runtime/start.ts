import fs from 'fs-extra'
import chalk from 'chalk'
import { join } from 'pathe'
import { prepareDirectory } from './utils'
import { build, watch, transpileModules } from './build'
import { logger } from '../logger'
import { configSchema } from '../config'
import { cacheDir, volarsDir } from '../constants'

export async function start(mode: 'build' | 'dev'): Promise<void> {
	await prepareDirectory(volarsDir)
	transpileModules(cacheDir)
	await fs.writeFile(
		join(volarsDir, 'config-schema.json'),
		JSON.stringify(configSchema, null, '\t')
	)
	await prepareDirectory(global.target.path)

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
