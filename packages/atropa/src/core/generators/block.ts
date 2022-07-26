import { deepMerge, objectMap } from '@antfu/utils'
import type {
	BlockFormatVersion,
	BlockTemplate
} from '../../schema/atropa/block'
import { ensureNamespaces, tryCatch } from '../utils'

type UserTemplate = Partial<BlockTemplate<'1.19.20'>>
interface VanillaTemplate {
	description?: Record<string, any>
	components?: Record<string, any>
	permutations?: Record<string, any>[]
	events?: Record<string, any>
}
interface Block {
	format_version: string
	'minecraft:block': VanillaTemplate
}
interface BLockResult {
	type: 'file'
	data: Block
}

/**
 * # Define Block
 * Generates a new block based on the given templates.
 * @param version The format version of the block.
 * @param fn A callback function with parameters to define the block.
 * @returns A module result.
 */
export function defineBlock<Version extends BlockFormatVersion>(
	version: Version,
	fn: (template: BlockTemplate<Version>) => void
): BLockResult {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as BlockTemplate<Version>)

		return {
			type: 'file',
			data: transformTemplate(template, version)
		}
	}, 'Failed to transform block template')
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
