import fse from 'fs-extra'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	entries: [
		'src/core/server',
		'src/runtime',
		{ input: 'src/schema/', outDir: 'dist/schema' }
	],
	externals: ['@antfu/utils'],
	hooks: {
		'build:done': () => {
			const cliContent = [
				'#!/usr/bin/env node',
				'import main from "../dist/runtime.mjs"',
				'main()'
			]
			fse.outputFileSync('./bin/atropa.mjs', cliContent.join('\n'))
		}
	}
})
