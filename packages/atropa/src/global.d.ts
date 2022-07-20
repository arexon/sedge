import type { Config } from './loader/config'

declare global {
	var config: Config
	var mode: 'build' | 'dev'
	var target: {
		name: string
		path: string
	}
	var isComMojang: boolean
}
