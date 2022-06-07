#!/usr/bin/env node

import cac from 'cac'
import { handleError } from './compiler/error'
import { build } from './compiler/build'

const main = async () => {
	const cli = cac('Volars')

	cli.command('build').action(async () => {
		build()
	})

	cli.parse()
}

main().catch(handleError)
