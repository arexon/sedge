#!/usr/bin/env node

import chalk from 'chalk'
import { logger } from './logger'
import { createVolars } from './runtime/volars'

async function main(): Promise<void> {
	const mode = process.argv[2] as 'build' | 'dev'
	const target = process.argv[3] as string | 'default'

	try {
		switch (mode) {
			case 'build':
				await createVolars({ target: target || 'default', dev: false })
				process.exit(0)

			case 'dev':
				await createVolars({ target: target || 'default', dev: true })
				// TODO: Implement syncing to com.mojang folder
				return

			default:
				logger.error(
					`Unknown command (${chalk.blackBright(process.argv[2])}).`,
					`Usage: ${chalk.cyan('volars [build|dev] [target]')}`
				)
				process.exit(1)
		}
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}
}

main()
