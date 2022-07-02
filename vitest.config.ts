import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			volars: '/packages/volars/src',
			'#playground/BP': '../playground/packs/BP'
		}
	},
	define: {
		config: {
			namespace: 'test'
		}
	}
})
