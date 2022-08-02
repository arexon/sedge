import type { AtropaModes } from './compiler'
import type { Config } from './config'

declare global {
	var atropa: {
		config: Config
		mode: AtropaModes
		target: {
			name: string
			path: string
		}
		isComMojang: boolean
	}
}
