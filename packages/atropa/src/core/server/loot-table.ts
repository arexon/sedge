import { logger } from '../../logger'
import type { LootTableTemplate } from '../../schema/atropa/server/loot-table'

interface VanillaTemplate {
	pools?: Record<string, any>[]
}

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
		const template: VanillaTemplate = {}

		fn(processTemplate(template))

		return template
	} catch (error) {
		logger.error('Failed to parse loot table:', error)
		process.exit(1)
	}
}

function processTemplate(fields: VanillaTemplate): LootTableTemplate {
	return {
		namespace: global.config.namespace,
		pools: (_template) => {
			fields.pools = [..._template, ...(fields.pools || [])]
		}
	}
}
