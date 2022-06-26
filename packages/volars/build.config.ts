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
		esbuild: {
			target: 'esnext'
		}
	}
})
