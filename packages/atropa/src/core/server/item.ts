import { deepMerge, objectMap } from '@antfu/utils'
import type {
	ItemFormatVersion,
	ItemTemplate
} from '../../schema/atropa/server/item'
import { ensureNamespaces } from '../utils'

interface OutputTemplate {
	namespace?: string
	description?: (template: Record<string, any>) => void
	components?: (template: Record<string, any>) => void
	events?: (template: Record<string, any>) => void
	use?: (...components: Record<string, any>[]) => void
}
interface InputTemplate {
	description?: Record<string, any>
	components?: Record<string, any>
	events?: Record<string, any>
	use?: Record<string, any>[]
}
interface Item {
	format_version: string
	'minecraft:item': Omit<InputTemplate, 'use'>
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
		const template: InputTemplate = {}

		fn(processTemplate(template) as ItemTemplate<Version>)
		return transformTemplate(template, version)
	} catch (error) {
		throw new Error(`Failed to parse item template`, error as Error)
	}
}

export function processTemplate(template: InputTemplate): OutputTemplate {
	return {
		namespace: global.config.namespace,
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
			template.use = [...(template.use || []), ...components]
		}
	}
}

function transformTemplate(template: InputTemplate, version: string): Item {
	if (template.use) {
		deepMerge(template, ...template.use)
		delete template.use
	}

	objectMap(template as Required<InputTemplate>, (key, value) => {
		if (key === 'components' && value) {
			return [key, ensureNamespaces(value, 'minecraft')]
		}
		return [key, value]
	})

	return {
		format_version: version,
		'minecraft:item': template
	}
}
