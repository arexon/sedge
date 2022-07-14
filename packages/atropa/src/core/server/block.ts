import { deepMerge } from '@antfu/utils'
import { prependWithMinecraftNamespaces, removeEmptyFields } from '../utils'
import type {
	BlockTemplate,
	BlockFormatVersion
} from '../../schema/atropa/server/block'

interface CustomTemplate {
	namespace?: string
	description?: (template: Record<string, any>) => void
	permutations?: (template: Record<string, any>[]) => void
	components?: (template: Record<string, any>) => void
	events?: (template: Record<string, any>) => void
}

interface VanillaTemplate {
	description?: Record<string, any>
	permutations?: Record<string, any>[]
	components?: Record<string, any>
	events?: Record<string, any>
}

/**
 * # Define Block
 *
 * Generates a new block based on the given templates.
 * @param version The format version of the block.
 * @param block A callback function with function parameters used to define the block.
 * @param components A list of reusable components that will be applied to the block.
 * @returns A block.
 */
export function defineBlock<Version extends BlockFormatVersion>(
	version: Version,
	block: (template: BlockTemplate<Version>) => void,
	components?: Record<string, any>[]
): Record<string, any> {
	const isLegacy = version === '1.16.0'
	const template: VanillaTemplate = {
		description: {},
		permutations: [],
		components: {},
		events: {}
	}

	try {
		block(processTemplate(template, isLegacy) as BlockTemplate<Version>)

		return {
			format_version: version,
			'minecraft:block': transformTemplate(template, isLegacy, components)
		}
	} catch (error) {
		throw new Error(`Failed to parse block template`, error as Error)
	}
}

export function processTemplate(
	fields: VanillaTemplate,
	isLegacy: boolean
): CustomTemplate {
	const template: CustomTemplate = {
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

function transformTemplate(
	fields: VanillaTemplate,
	isLegacy: boolean,
	components?: Record<string, any>[]
): Record<string, any> {
	const template: VanillaTemplate = {
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
