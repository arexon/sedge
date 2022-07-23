import { deepMerge, objectMap } from '@antfu/utils'
import type { ItemFormatVersion, ItemTemplate } from '../../schema/atropa/item'
import { ensureNamespaces } from '../utils'

interface UserTemplate {
	namespace?: string
	description?: (template: Record<string, any>) => void
	components?: (template: Record<string, any>) => void
	events?: (template: Record<string, any>) => void
	use?: (...components: Record<string, any>[]) => void
}
interface VanillaTemplate {
	description?: Record<string, any>
	components?: Record<string, any>
	events?: Record<string, any>
}
interface Item {
	format_version: string
	'minecraft:item': VanillaTemplate
}

/**
 * # Define Item
 *
 * Generates a new item based on the given templates.
 * @param version The format version of the item.
 * @param fn A callback function with function parameters used to define the item.
 * @returns An item.
 */
export function defineItem<Version extends ItemFormatVersion>(
	version: Version,
	fn: (template: ItemTemplate<Version>) => void
): Object {
	try {
		const template = {}

		fn(processTemplate(template) as ItemTemplate<Version>)
		return transformTemplate(template, version)
	} catch (error) {
		throw new Error(`Failed to transform item template`, error as Error)
	}
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		description: (_template) => {
			template.description = { ...template.description, ..._template }
		},
		components: (_template) => {
			template.components = { ...template.components, ..._template }
		},
		events: (_template) => {
			template.events = { ...template.events, ..._template }
		},
		use: (...components) => {
			deepMerge(template, ...components)
		}
	}
}

function transformTemplate(template: VanillaTemplate, version: string): Item {
	const transformedTemplate = objectMap(
		template as Required<VanillaTemplate>,
		(key, value) => {
			if (key === 'components') {
				return [key, ensureNamespaces(value, 'minecraft')]
			}
			return [key, value]
		}
	) as VanillaTemplate

	return {
		format_version: version,
		'minecraft:item': transformedTemplate
	}
}
