import { processTemplate } from '../compiler/transformers/loot-table'
import type { LootTableTemplate } from '../schema/atropa/server/loot-table'

/**
 * # Define Loot Table
 *
 * Generates a loot table from the given template.
 * @param fn A callback function with function parameters used to define the loot table.
 * @returns A loot table.
 */
export function defineLootTable(
	fn: (template: LootTableTemplate) => void
): Record<string, any> {
	try {
		const template = {}

		fn(processTemplate(template))
		return template
	} catch (error) {
		throw new Error('Failed to transform loot table:', error as Error)
	}
}
