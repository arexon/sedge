import fs from 'fs-extra'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	entries: [
		'src/index',
		'src/cli',
		{ input: 'src/schema/', outDir: 'dist/schema' }
	],
	externals: ['@antfu/utils'],
	hooks: {
		'build:done': async () => {
			let source = await fs.readFile('./dist/cli.mjs', 'utf8')
			source = source.replace('ts-node', 'node')
			await fs.writeFile('./dist/cli.mjs', source)
		}
	}
})
