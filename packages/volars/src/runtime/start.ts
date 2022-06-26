import fs from 'fs-extra'
import chalk from 'chalk'
import { configSchema } from '../schema/config'
import { build } from './build'
import { watch } from './watch'
import { prepareDir } from './fs'
import { logger } from '../logger'

export async function start(mode: 'build' | 'dev'): Promise<void> {
	const withTarget = () => {
		logger.info(
			'Via target',
			chalk.magenta(global.target.name),
			'at',
			chalk.blackBright(global.target.path)
		)
	}

	await prepareDir('.volars')
	await fs.writeFile(
		'.volars/configSchema.json',
		JSON.stringify(configSchema, null, '\t')
	)
	await prepareDir(global.target.path)

	if (mode === 'build') {
		logger.start('Building the project...')
		withTarget()

		return await build()
	} else {
		logger.start('Watching the project...')
		withTarget()

		return await watch()
	}
}
