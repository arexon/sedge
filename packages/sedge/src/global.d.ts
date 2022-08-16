import type { SedgeModes } from './compiler'
import type { Config } from './compiler/config'

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
