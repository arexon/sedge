#!/usr/bin/env ts-node

import chalk from 'chalk'
import { logger } from './logger'
import { createVolars } from './volars'

async function main(): Promise<void> {
	const mode = process.argv[2] as 'build' | 'dev'
	const target = process.argv[3] as string | 'default'

	try {
		switch (mode) {
			case 'build':
				await createVolars({ target, dev: false })
				break

			case 'dev':
				await createVolars({ target, dev: true })
				return

			default:
				logger.error(
					`Unknown command ${chalk.blackBright(process.argv[2])}.`,
					`Usage: ${chalk.cyan('volars [build|dev] [target]')}`
				)
				process.exit(1)
		}
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}

	process.exit(0)
}

main()
