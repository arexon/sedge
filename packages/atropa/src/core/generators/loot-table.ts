import { deepMerge } from '@antfu/utils'
import type { Pools } from '../../schema/loot-table'
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
interface LootTableResult {
	type: 'json'
	data: LootTable
}

/**
 * # Define Loot Table
 * Generates a loot table from the given template.
 * @param fn A function that defines the loot table.
 * @returns A module result that contains a loot table.
 */
export function defineLootTable(
	fn: (template: LootTableTemplate) => void
): LootTableResult {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as LootTableTemplate)

		return {
			type: 'json',
			data: template
		}
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
