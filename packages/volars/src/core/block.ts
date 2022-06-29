import { deepMerge } from '@antfu/utils'
import { logger } from '../logger'
import { prependWithMinecraftNamespaces } from './utils'

interface Template {
	namespace: string
	description: (template: object) => void
	permutations?: (template: object[]) => void
	components: (template: object) => void
	events?: (template: object) => void
}

interface TemplateFields {
	description: object
	permutations?: object[]
	components: object
	events?: object
}

export async function defineBlock(
	version: string,
	block: (template: Template) => void,
	components: object[]
): Promise<object> {
	const template: TemplateFields = {
		description: {},
		permutations: [],
		components: {},
		events: {}
	}

	try {
		block(processTemplate(template, version === '1.16.0'))

		return {
			format_version: version,
			'minecraft:block': transformTemplate(
				template,
				version === '1.16.0',
				components
			)
		}
	} catch (error) {
		logger.error(`Failed to parse block:`, error)
		process.exit(0)
	}
}

export function processTemplate(
	fields: TemplateFields,
	isLegacy: boolean
): Template {
	return {
		namespace: global.config.namespace,
		description: (template) => {
			fields.description = { ...fields.description, ...template }
		},
		components: (template) => {
			fields.components = { ...fields.components, ...template }
		},
		...(!isLegacy && {
			permutations: (template) => {
				fields.permutations = fields.permutations
					? [...fields.permutations, ...template]
					: template
			},
			events: (template) => {
				fields.events = { ...fields.events, ...template }
			}
		})
	}
}

function transformTemplate(
	fields: TemplateFields,
	isLegacy: boolean,
	components?: object[]
): object {
	let template: TemplateFields = {
		description: fields.description,
		...(!isLegacy && {
			permutations: fields.permutations || []
		}),
		components: fields.components,
		...(!isLegacy && { events: fields.events })
	}

	if (components !== undefined) {
		for (const component of components) {
			template = deepMerge(template, component)
		}
	}

	return prependWithMinecraftNamespaces(template)
}
