import jiti from 'jiti'
import { resolve } from 'pathe'
import consola from 'consola'
import { Config } from './types'

const logger = consola.withTag('volars config')

export async function loadConfig(): Promise<Config> {
	const path = resolve(process.cwd(), 'config.json')
	const config: Config = await jiti('', {
		interopDefault: true
	})(path)

	validateConfig(config)

	return config
}

function validateConfig(config: Config): void {
	const requiredProperties = ['name', 'namespace', 'packs']
	let missingProperties: string[] = []

	for (const property of requiredProperties) {
		if (config.hasOwnProperty(property)) continue
		missingProperties.push(property)
	}

	if (missingProperties.length > 0) {
		logger.error('Missing required properties:', missingProperties)
		process.exit(1)
	}
}

export * from './types'
