import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: ['src/index', 'src/cli', 'src/config'],
	dependencies: ['c12', 'mri', 'pathe', 'globby', 'consola'],
	rollup: {
		inlineDependencies: true,
		esbuild: {
			target: 'esnext'
		}
	}
})
