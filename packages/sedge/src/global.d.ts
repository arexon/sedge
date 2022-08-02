import type { SedgeModes } from './compiler'
import type { Config } from './config'

declare global {
	var sedge: {
		config: Config
		mode: SedgeModes
		target: {
			name: string
			path: string
		}
		isComMojang: boolean
	}
}
