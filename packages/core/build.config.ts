import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: ['src/index'],
	rollup: {
		esbuild: {
			target: 'esnext'
		}
	}
})
