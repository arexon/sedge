import { logger } from '../../logger'
import type { LootTableTemplate } from '../../schema/atropa/server/loot-table'

/**
 * # Define Loot Table
 *
 * Generates a loot table from the given template.
 * @param fn A callback function with function parameters used to define the loot table.
 * @returns An object representation of the loot table.
 */
export function defineLootTable(
	fn: (template: LootTableTemplate) => void
): Record<string, any> {
	let template: Record<string, any>[] = []

	try {
		fn({
			namespace: global.config.namespace,
			pools: (_template) => {
				template = [..._template, ...template]
			}
		})

		return {
			pools: template
		}
	} catch (error) {
		logger.error(`Failed to parse loot table:`, error)
		process.exit(0)
	}
}
