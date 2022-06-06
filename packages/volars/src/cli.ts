#!/usr/bin/env node

import cac from 'cac'
import { handleError } from './compiler/error'
import { Compiler } from './compiler/Compiler'

const main = async () => {
	const cli = cac('Volars')
	const compiler = new Compiler()

	cli.command('build').action(async () => {
		await compiler.init()
		await compiler.build()
	})

	cli.parse()
}

main().catch(handleError)
