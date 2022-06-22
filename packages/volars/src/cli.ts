#!/usr/bin/env node

import { start, createVolars } from 'volars-runtime'

async function main(): Promise<void> {
	let volars = await createVolars({
		dev: false
	})

	try {
		switch (process.argv[2]) {
			case 'build':
				await start(volars)
				process.exit(0)

			case 'dev':
				volars.dev = true

				await start(volars)
				return

			default:
				volars.logger.error(`Unknown command! Usage: volars build|dev`)
				process.exit(1)
		}
	} catch (error) {
		volars.logger.error(error)
		process.exit(1)
	}
}

main()
