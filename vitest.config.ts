import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'atropa/core': '/packages/atropa/src/core',
			'#playground/BP': '../playground/packs/BP'
		}
	},
	define: {
		atropa: {
			config: { namespace: 'test' },
			target: { name: 'test' }
		}
	}
})
