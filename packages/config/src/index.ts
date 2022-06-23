import jiti from 'jiti'
import { resolve } from 'pathe'
import { Config } from './types'

export async function loadConfig(): Promise<Config> {
	const path = resolve(process.cwd(), 'config.json')
	const config: Config = await jiti('', {
		interopDefault: true
	})(path)

	return config
}

export * from './types'
