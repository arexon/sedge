import fse from 'fs-extra'
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
		'build:done': () => {
			let source = fse.readFileSync('./dist/cli.mjs', 'utf8')
			source = source.replace('ts-node', 'node')
			fse.writeFileSync('./dist/cli.mjs', source)
		}
	}
})
