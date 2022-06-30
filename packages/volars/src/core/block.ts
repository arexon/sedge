import { deepMerge } from '@antfu/utils'
import { logger } from '../logger'
import { prependWithMinecraftNamespaces, removeEmptyFields } from './utils'

interface Template {
	namespace?: string
	description?: (template: object) => void
	permutations?: (template: object[]) => void
	components?: (template: object) => void
	events?: (template: object) => void
}

interface TemplateFields {
	description: object
	permutations?: object[]
	components: object
	events?: object
}

export function defineBlock(
	version: string,
	block: (template: Template) => void,
	components: object[]
): object {
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

// Provides a template pre-process function.
export function processTemplate(
	fields: TemplateFields,
	isLegacy: boolean
): Template {
	const template: Template = {
		namespace: global.config.namespace,
		description: (template) => {
			fields.description = { ...fields.description, ...template }
		},
		components: (template) => {
			fields.components = { ...fields.components, ...template }
		}
	}

	if (!isLegacy) {
		deepMerge(template, {
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

	return template
}

// Compiles the template and custom components into an object
// ready to be merged into the 'minecraft:block' object.
function transformTemplate(
	fields: TemplateFields,
	isLegacy: boolean,
	components?: object[]
): object {
	const template: TemplateFields = {
		description: fields.description,
		components: fields.components
	}

	if (!isLegacy) {
		deepMerge(template, {
			permutations: fields.permutations,
			events: fields.events
		})
	}

	// Merges custom components with the template if there's any.
	if (components) deepMerge(template, ...components)

	return prependWithMinecraftNamespaces(removeEmptyFields(template))
}
