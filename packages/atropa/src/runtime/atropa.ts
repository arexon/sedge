import chalk from 'chalk'
import { loadConfig } from '../config'
import { comMojangDir } from '../constants'
import { logger } from '../logger'
import { start } from './start'

interface AtropaInstance {
	target: string
	dev: boolean
}

export async function createAtropa({
	target = 'default',
	dev
}: AtropaInstance): Promise<void> {
	global.config = loadConfig()

	const targetIsDefault = target === 'default'
	const defaultTargetPath = dev && targetIsDefault ? comMojangDir : './build'

	if (defaultTargetPath === null && dev) {
		logger.error(
			'Could not find com.mojang directory.',
			`Please set the ${chalk.yellow(
				'LOCALAPPDATA'
			)} environment variable, or ensure that Minecraft is properly installed.`
		)
		process.exit(1)
	}

	const targetIsConfigured = Object.getOwnPropertyNames(
		global.config.atropa?.targets || {}
	).find((key) => key === target)
	const targetIsInComMojang = defaultTargetPath === comMojangDir

	global.target = {
		name: targetIsInComMojang ? 'com.mojang' : target,
		path: global.config.atropa?.targets?.[target] || defaultTargetPath!
	}

	// Start if there's a configured target or if the target is the default
	if (targetIsConfigured || targetIsDefault) {
		await start(dev ? 'dev' : 'build')
	} else {
		logger.error(
			'Target',
			chalk.yellow(target),
			'does not match any target in',
			chalk.blackBright('config.atropa.targets')
		)
		process.exit(1)
	}
}
