import { deepMerge, objectMap } from '@antfu/utils'
import { ensureNamespaces } from '../utils'

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
interface BlockObject {
	format_version: string
	'minecraft:block': VanillaTemplate
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

export function transformTemplate(
	template: VanillaTemplate,
	version: string
): BlockObject {
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
