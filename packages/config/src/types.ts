type PackType = 'behaviorPack' | 'resourcePack'
export type Packs = { [packType in PackType]: string }

interface VolarsConfig {
	targets: {
		[name: string | 'default']: string
	}
}
export interface Config {
	name: string
	authors: string[]
	namespace: string
	packs: Packs
	volars: VolarsConfig
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
			}
		},
		volars: {
			description: 'Additional configurations unique to Volars.',
			type: 'object',
			properties: {
				targets: {
					description:
						"Defines where the compiled project output location. The key can be used by the Volar's CLI to specify the target. The value will be the output location.",
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
