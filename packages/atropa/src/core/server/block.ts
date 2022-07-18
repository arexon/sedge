import { deepMerge, objectMap } from '@antfu/utils'
import { ensureNamespaces, removeEmptyProperties } from '../utils'
import type {
	BlockTemplate,
	BlockFormatVersion
} from '../../schema/atropa/server/block'

type Object = Record<string, any>
interface InputTemplate {
	namespace?: string
	description?: (template: Object) => void
	permutations?: (template: Object[]) => void
	components?: (template: Object) => void
	events?: (template: Object) => void
	use?: (...components: Object[]) => void
}
interface OutputTemplate {
	description?: Object
	permutations?: Object[]
	components?: Object
	events?: Object
	use?: Object[]
}

/**
 * # Define Block
 *
 * Generates a new block based on the given templates.
 * @param version The format version of the block.
 * @param fn A callback function with function parameters used to define the block.
 * @returns A block.
 */
export function defineBlock<Version extends BlockFormatVersion>(
	version: Version,
	fn: (template: BlockTemplate<Version>) => void
): Record<string, any> {
	try {
		const isLegacy = version === '1.16.0'
		const template: OutputTemplate = {}

		fn(processTemplate(template, isLegacy) as BlockTemplate<Version>)

		return {
			format_version: version,
			'minecraft:block': transformTemplate(template, isLegacy)
		}
	} catch (error) {
		throw new Error(`Failed to parse block template`, error as Error)
	}
}

export function processTemplate(
	fields: OutputTemplate,
	isLegacy: boolean
): Object {
	const template: InputTemplate = {
		namespace: global.config.namespace,
		description: (template) => {
			fields.description = { ...fields.description, ...template }
		},
		components: (template) => {
			fields.components = { ...fields.components, ...template }
		},
		use: (...components) => {
			fields.use = [...(fields.use || []), ...components]
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

function transformTemplate(fields: OutputTemplate, isLegacy: boolean): Object {
	const template: Object = {
		description: fields.description,
		components: fields.components
	}

	if (!isLegacy) {
		deepMerge(template, {
			permutations: fields.permutations,
			events: fields.events
		})
	}
	if (fields.use) deepMerge(template, ...fields.use)

	return objectMap(removeEmptyProperties(template), (key, value) => {
		if (key === 'components') {
			return [key, ensureNamespaces(value, 'minecraft')]
		}
		if (key === 'permutations') {
			for (const permutation of value) {
				if (permutation.components !== undefined) {
					permutation.components = ensureNamespaces(
						permutation.components,
						'minecraft'
					)
				}
			}
		}
		return [key, value]
	})
}
