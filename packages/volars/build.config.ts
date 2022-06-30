import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	entries: [
		'src/index',
		'src/cli',
		{
			input: 'src/schema/',
			outDir: 'dist/schema'
		}
	],
	rollup: {
		replace: {
			delimiters: ['', ''],
			include: ['src/cli.ts'],
			values: {
				'#!/usr/bin/env ts-node': '#!/usr/bin/env node'
			}
		}
	}
})
