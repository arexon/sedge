#!/usr/bin/env node

import { start, createVolars } from 'volars-runtime'

async function main(): Promise<void> {
	let volars = await createVolars({
		dev: false
	})

	const mode = process.argv[2] as 'build' | 'dev'
	const target = process.argv[3] as string | 'default' | undefined
	const configTargets = volars.config.volars.targets

	const tryStart = async (): Promise<void> => {
		try {
			switch (mode) {
				case 'build':
					await start(volars)
					process.exit(0)

				case 'dev':
					volars.dev = true
					// TODO: Implement syncing to com.mojang folder
					await start(volars)
					return

				default:
					volars.logger.error(
						'Unknown command! Usage: volars [build|dev] [target]'
					)
					process.exit(1)
			}
		} catch (error) {
			volars.logger.error(error)
			process.exit(1)
		}
	}

	if (target === 'default' || target === undefined) {
		if (configTargets.default) {
			volars.target = configTargets.default
		}

		tryStart()
	} else if (configTargets[target]) {
		volars.target = configTargets[target]

		tryStart()
	} else {
		volars.logger.error(
			`Target (${target}) does not match any configured target.`,
			'\nConfigured Targets:',
			Object.keys(configTargets)
		)
		process.exit(1)
	}
}

main()
