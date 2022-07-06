import chalk from 'chalk'
import { loadConfig } from './config'
import { logger } from './logger'
import { start } from './runtime'

interface VolarsInstance {
	target: string
	dev: boolean
}

export async function createVolars({
	target = 'default',
	dev
}: VolarsInstance): Promise<void> {
	global.config = loadConfig()

	const mode = dev ? 'dev' : 'build'
	const defaultTargetPath = `./${mode}`

	const targetIsDefault = target === 'default'
	const targetIsConfigured = Object.getOwnPropertyNames(
		global.config.volars?.targets || {}
	).find((key) => key === target)

	global.target = {
		name: target,
		path: global.config.volars?.targets?.[target] || defaultTargetPath
	}

	// Start if there's a configured target or if the target is the default
	if (targetIsConfigured || targetIsDefault) await start(mode)
	else {
		logger.error(
			'Target',
			chalk.yellow(target),
			'does not match any target in',
			chalk.blackBright('config.volars.targets')
		)
		process.exit(1)
	}
}
