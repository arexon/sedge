import { deepMerge } from '@antfu/utils'
import type { LootTableTemplate } from '../../schema/atropa/loot-table'
import { tryCatch } from '../utils'

type UserTemplate = Partial<LootTableTemplate>
interface VanillaTemplate {
	pools?: Record<string, any>[]
}
interface LootTableResult {
	type: 'file'
	data: VanillaTemplate
}

/**
 * # Define Loot Table
 * Generates a loot table from the given template.
 * @param fn A callback function with parameters to define the loot table.
 * @returns A module result.
 */
export function defineLootTable(
	fn: (template: LootTableTemplate) => void
): LootTableResult {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as LootTableTemplate)

		return {
			type: 'file',
			data: template
		}
	}, 'Failed to transform loot table')
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		pools: (_template) => {
			template.pools = [..._template, ...(template.pools || [])]
		},
		use: (...components) => {
			deepMerge(template, ...components)
		}
	}
}
