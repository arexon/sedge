import { deepMerge, objectMap } from '@antfu/utils'
import { ensureNamespaces } from '../utils'
import type {
	BlockTemplate,
	BlockFormatVersion
} from '../../schema/atropa/server/block'

interface UserTemplate {
	namespace?: string
	description?: (template: Record<string, any>) => void
	permutations?: (template: Record<string, any>[]) => void
	components?: (template: Record<string, any>) => void
	events?: (template: Record<string, any>) => void
	use?: (...components: Record<string, any>[]) => void
}
interface VanillaTemplate {
	description?: Record<string, any>
	permutations?: Record<string, any>[]
	components?: Record<string, any>
	events?: Record<string, any>
}
interface Block {
	format_version: string
	'minecraft:block': VanillaTemplate
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
		const template = {}

		fn(processTemplate(template) as BlockTemplate<Version>)
		return transformTemplate(template, version)
	} catch (error) {
		throw new Error(`Failed to transform block template`, error as Error)
	}
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: process._namespace,
		description: (_template) => {
			template.description = { ...template.description, ..._template }
		},
		components: (_template) => {
			template.components = { ...template.components, ..._template }
		},
		permutations: (_template) => {
			template.permutations = [
				...(template.permutations || []),
				..._template
			]
		},
		events: (_template) => {
			template.events = { ...template.events, ..._template }
		},
		use: (...components) => {
			deepMerge(template, ...components)
		}
	}
}

function transformTemplate(template: VanillaTemplate, version: string): Block {
	const transformedTemplate = objectMap(
		template as Required<VanillaTemplate>,
		(key, value) => {
			if (key === 'components') {
				return [key, ensureNamespaces(value, 'minecraft')]
			}
			if (key === 'permutations' && Array.isArray(value)) {
				for (const permutation of value) {
					permutation.components = ensureNamespaces(
						permutation.components,
						'minecraft'
					)
				}
			}
			return [key, value]
		}
	) as VanillaTemplate

	return {
		format_version: version,
		'minecraft:block': transformedTemplate
	}
}
