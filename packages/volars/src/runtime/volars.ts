import chalk from 'chalk'
import { loadConfig } from '../config'
import { logger } from '../logger'
import { start } from './start'

interface VolarsInstance {
	target: string
	dev: boolean
}

export async function createVolars({
	target,
	dev
}: VolarsInstance): Promise<void> {
	global.config = await loadConfig()

	const mode = dev ? 'dev' : 'build'
	const defaultTargetPath = `./${mode}`

	const targetIsConfigured = Object.getOwnPropertyNames(
		global.config.volars?.targets
	).find((key) => key === target)
	const targetIsDefault = target === 'default'

	global.target = {
		name: target,
		path: global.config.volars?.targets[target] || defaultTargetPath
	}

	// Start if there's a configured target or if the target is the default
	if (targetIsConfigured || targetIsDefault) await start(mode)
	else {
		logger.error(
			`Target (${chalk.cyan(
				target
			)}) does not match any configured target.`
		)
		process.exit(1)
	}
}
