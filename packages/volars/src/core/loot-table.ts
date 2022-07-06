import { logger } from '../logger'
import type { LootTableTemplate } from '../schema/volars/loot-table'

export function defineLootTable(
	fn: (template: LootTableTemplate) => void
): Record<string, any> {
	const template: Record<string, any>[] = []

	try {
		fn({
			namespace: global.config.namespace,
			pools: (_template) => {
				template.push(_template)
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
