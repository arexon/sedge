import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: ['src/index', 'src/cli', 'src/config'],
	dependencies: [
		'c12',
		'mri',
		'pathe',
		'globby',
		'consola',
		'chokidar',
		'perfect-debounce',
		'fs-extra'
	],
	rollup: {
		inlineDependencies: true,
		esbuild: {
			target: 'esnext'
		}
	}
})
