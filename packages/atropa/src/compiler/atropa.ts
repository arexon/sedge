import { blue, yellow, blackBright } from 'colorette'
import { hasOwnProperty } from '@antfu/utils'
import { loadConfig } from '../loader/config'
import { comMojangDir } from '../constants'
import { logger } from '../logger'
import { start } from './start'

interface AtropaOptions {
	target: string
	mode: 'build' | 'dev'
}

export async function createAtropa(options: AtropaOptions): Promise<void> {
	try {
		global.config = await loadConfig()

		const targetIsDefault = options.target === 'default'
		const modeIsDev = options.mode === 'dev'
		const defaultTargetPath =
			modeIsDev && targetIsDefault ? comMojangDir : './build'

		if (defaultTargetPath === comMojangDir && modeIsDev) {
			global.isComMojang = true
		} else if (defaultTargetPath === null && modeIsDev) {
			throw new Error(
				[
					`Could not find ${blue('com.mojang')} folder`,
					`Please set the ${blue(
						'LOCALAPPDATA'
					)} environment variable, or ensure that Minecraft is properly installed`
				].join('\n')
			)
		} else {
			global.isComMojang = false
		}

		const targetIsConfigured = hasOwnProperty(
			global.config.atropa?.targets || {},
			options.target
		)

		global.target = {
			name: options.target,
			path:
				global.config.atropa?.targets?.[options.target] ||
				defaultTargetPath!
		}

		// Start if there's a configured target or if the target is the default
		if (targetIsConfigured || targetIsDefault) {
			await start(options.mode)
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
