import type { Config } from './config'

declare global {
	var config: Config
	var target: {
		name: string
		path: string
	}
}
