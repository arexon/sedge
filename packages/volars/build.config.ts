import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: [
		'src/index',
		'src/cli',
		'src/config',
		{
			input: 'src/definitions/',
			outDir: 'dist/definitions'
		}
	],
	dependencies: [
		'mri',
		'pathe',
		'globby',
		'consola',
		'chokidar',
		'perfect-debounce',
		'fs-extra',
		'jiti'
	],
	rollup: {
		inlineDependencies: true,
		esbuild: {
			target: 'esnext'
		}
	}
})
