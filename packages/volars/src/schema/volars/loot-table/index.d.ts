import type { Pools } from '../../vanilla/loot-table'
import type { Namespace } from '../namespace'

type LootTableTemplate = Namespace & {
	/**
	 * ## Pools
	 *
	 * Lists the loot pools for this loot table.
	 */
	pools: (template: Pools[]) => void
}

/**
 * # Define Loot Table
 *
 * Generates a loot table from the given template.
 * @param fn A callback function with function parameters used to define the loot table.
 * @returns An object representation of the loot table.
 */
declare function defineLootTable(
	fn: (template: LootTableTemplate) => void
): Record<string, any>

export { defineLootTable, LootTableTemplate }
