import chalk from 'chalk'
import jiti from 'jiti'
import { resolve } from 'pathe'
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

export async function loadConfig(): Promise<Config> {
	const path = resolve(process.cwd(), 'config.json')
	const config = await jiti('', { interopDefault: true })(path)

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

export const configSchema = {
	$schema: 'http://json-schema.org/draft-07/schema',
	title: 'Project Config',
	type: 'object',
	properties: {
		name: {
			description:
				'The name of the project. This is used in the exported project file name.',
			type: 'string'
		},
		description: {
			description: 'The description of the project.',
			type: 'string'
		},
		authors: {
			description: 'Creators of the project.',
			type: 'array',
			items: {
				anyOf: [
					{
						type: 'object',
						properties: {
							name: { type: 'string' },
							logo: { type: 'string' }
						},
						required: ['name'],
						additionalProperties: false
					},
					{
						type: 'string'
					}
				]
			}
		},
		namespace: {
			description:
				"The namespace used for the project. The namespace 'minecraft' is not a valid string for this field. This will be used in functions such as 'defineBlock'.",
			type: 'string'
		},
		packs: {
			description: "Stores the list of paths to the project's packs.",
			type: 'object',
			propertyNames: {
				enum: [
					'behaviorPack',
					'resourcePack',
					'skinPack',
					'worldTemplate'
				]
			},
			patternProperties: {
				'.*': {
					description:
						'Path to the pack relative to the config.json.',
					type: 'string'
				}
			},
			required: ['behaviorPack', 'resourcePack']
		},
		volars: {
			description: 'Additional configurations specific to Volars.',
			type: 'object',
			properties: {
				targets: {
					description:
						"Defines the compiled project output location. The key can be used by the Volar's CLI to specify the target. The value will be the output path.",
					type: 'object',
					patternProperties: {
						'.*': {
							type: 'string'
						}
					}
				}
			}
		}
	},
	required: ['name', 'namespace', 'packs']
}
