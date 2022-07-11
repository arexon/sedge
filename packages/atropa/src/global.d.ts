import type { Config } from './loader/config'

declare global {
	var config: Config
	var target: {
		name: string
		path: string
	}
}
