import { deepMerge } from '@antfu/utils'
import type { Pools } from '../../schema/vanilla/loot-table'
import { tryCatch } from '../utils'
import type { Namespace, UseFunction } from './types'

export interface LootTableTemplate extends Namespace, UseFunction {
	/**
	 * ## Pools
	 * Lists the loot pools for this loot table.
	 * @param template The pools to add to the loot table.
	 */
	pools(template: Pools[]): void
}

type UserTemplate = Partial<LootTableTemplate>
interface LootTable {
	pools?: Record<string, any>[]
}

/**
 * # Define Loot Table
 * Generates a loot table from the given template.
 * @param fn A callback function with parameters to define the loot table.
 * @returns A module result.
 */
export function defineLootTable(
	fn: (template: LootTableTemplate) => void
): LootTable {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as LootTableTemplate)

		return template
	}, 'Failed to transform loot table')
}

export function processTemplate(template: LootTable): UserTemplate {
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
