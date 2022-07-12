import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'atropa/server': '/packages/atropa/src/core/server',
			'#playground/BP': '../playground/packs/BP'
		}
	},
	define: {
		config: {
			namespace: 'test'
		},
		target: {
			name: 'test'
		}
	}
})
