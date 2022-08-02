import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: [
		{ input: 'src/compiler/index', name: 'compiler' },
		{ input: 'src/core/index', name: 'core' },
		'src/config'
	],
	externals: ['@antfu/utils']
})
