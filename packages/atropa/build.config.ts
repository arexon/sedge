import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	entries: [
		'src/core/server',
		'src/compiler',
		{ input: 'src/schema/', outDir: 'dist/schema' }
	],
	externals: ['@antfu/utils']
})
