import jiti from 'jiti'
import { resolve } from 'pathe'
import { logger } from './logger'

export interface Config {
	name: string
	authors?: string[]
	namespace: string
	packs: Packs
	volars?: {
		targets: {
			[name: string | 'default']: string
		}
	}
}

export type Packs = { [key in 'behaviorPack' | 'resourcePack']: string }

export async function loadConfig(): Promise<Config> {
	const path = resolve(process.cwd(), 'config.json')
	const config = await jiti('', { interopDefault: true })(path)

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
		logger.error(`Missing required properties: ${missingProperties}`)
		process.exit(1)
	}
}
