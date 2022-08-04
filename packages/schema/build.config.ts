import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	entries: [{ input: 'src', builder: 'mkdist' }]
})
