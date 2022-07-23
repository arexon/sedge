import type { Config } from '../loader/config'

type ValueOf<T> = T[keyof T]
declare global {
	namespace NodeJS {
		interface Process {
			_namespace: string
			_packs: ValueOf<Pick<Config, 'packs'>>
			_minify: boolean
		}
	}
}
