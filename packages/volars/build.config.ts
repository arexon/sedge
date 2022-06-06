import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: ['src/index', 'src/cli'],
	dependencies: ['c12', 'vite', 'vite-node', 'cac', 'pathe', 'fast-glob', 'consola', 'chalk']
})
