import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: [
		{ input: 'src/loader/index', name: 'loader' },
		{ input: 'src/compiler/index', name: 'compiler' },
		{ input: 'src/core/server/index', name: 'server' },
		{ input: 'src/core/api/index', name: 'api' }
	],
	externals: ['@antfu/utils']
})
