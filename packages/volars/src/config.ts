import fse from 'fs-extra'
import chalk from 'chalk'
import { logger } from './logger'

export interface Config {
	name: string
	authors?: string[]
	namespace: string
	packs: {
		[key in 'behaviorPack' | 'resourcePack']: string
	}
	volars?: {
		targets?: {
			[name: string | 'default']: string
		}
	}
}

export function loadConfig(): Config {
	const json = fse.readFileSync('config.json', 'utf-8')
	const config = JSON.parse(json) as Config

	validateConfig(config)

	return config
}

function validateConfig(config: Config): void {
	const requiredProperties = ['name', 'namespace', 'packs']
	const missingProperties: string[] = []

	for (const property of requiredProperties) {
		if (Object.prototype.hasOwnProperty.call(config, property)) continue
		missingProperties.push(property)
	}

	if (missingProperties.length > 0) {
		logger.error(
			`Missing required properties: ${chalk.blackBright(
				missingProperties
			)}`
		)
		process.exit(1)
	}
}
