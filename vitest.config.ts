import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'sedge/core': '/packages/sedge/src/core',
			'#playground/BP': '../playground/packs/BP'
		}
	},
	define: {
		sedge: {
			config: { namespace: 'test' },
			target: { name: 'test' }
		}
	}
})
