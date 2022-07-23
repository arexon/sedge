import type { Config } from './loader/config'

declare global {
	var atropa: {
		config: Config
		mode: 'dev' | 'build'
		target: {
			name: string
			path: string
		}
		isComMojang: boolean
	}
}
