#!/usr/bin/env node

import mri from 'mri'
import consola from 'consola'
import { start } from './compiler/build/start'
import { createVolars } from './compiler/volars'

const main = async () => {
	const args = mri(process.argv.slice(2))
	const command = args._[0]

	if (command === 'dev') {
		const volars = await createVolars({
			dev: true
		})

		await start(volars)
		return
	}

	if (command === 'build') {
		const volars = await createVolars({
			dev: false
		})

		await start(volars)
		process.exit(0)
	}

	consola.error(`Unknown command ${command} - use volars dev|build`)
	process.exit(1)
}

main().catch((error) => {
	consola.error(error)
	process.exit(1)
})
