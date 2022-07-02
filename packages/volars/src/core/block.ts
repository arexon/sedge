import { deepMerge } from '@antfu/utils'
import { logger } from '../logger'
import { prependWithMinecraftNamespaces, removeEmptyFields } from './utils'
import type { BlockTemplate } from '../schema/volars/block/template'
import type { FormatVersion } from '../schema/vanilla/formatVersion'

// These are the functions and properties that are available in the template
// in `defineBlock`. They are used to generate the block's object.
interface Template {
	namespace?: string
	description?: (template: Record<string, any>) => void
	permutations?: (template: Record<string, any>[]) => void
	components?: (template: Record<string, any>) => void
	events?: (template: Record<string, any>) => void
}

// The top-level fields for the block.
interface TemplateFields {
	description?: Record<string, any>
	permutations?: Record<string, any>[]
	components?: Record<string, any>
	events?: Record<string, any>
}

export function defineBlock<Version extends FormatVersion>(
	version: Version,
	block: (template: BlockTemplate<Version>) => void,
	components?: Record<string, any>[]
): Record<string, any> {
	const template: TemplateFields = {
		description: {},
		permutations: [],
		components: {},
		events: {}
	}

	try {
		block(
			processTemplate(
				template,
				version === '1.16.0'
			) as BlockTemplate<Version>
		)

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

// Provides a template preprocess function.
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
	components?: Record<string, any>[]
): Record<string, any> {
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
	if (components) deepMerge(template, ...components)

	return prependWithMinecraftNamespaces(removeEmptyFields(template))
}
