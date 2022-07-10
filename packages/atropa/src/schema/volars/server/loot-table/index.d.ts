import type { LootTableTemplate } from './template'

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

export { defineLootTable, type LootTableTemplate }
