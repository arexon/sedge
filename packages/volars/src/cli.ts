#!/usr/bin/env node

import cac from 'cac'
import { handleError } from './compiler/error'
import { build } from './compiler/build'

const name = 'Volars'

const main = async () => {
	const cli = cac(name)

	cli.command('build').action(async () => {
		console.info(`${name} is building the project...`)

		await build()
	})

	cli.parse()
}

main().catch(handleError)
