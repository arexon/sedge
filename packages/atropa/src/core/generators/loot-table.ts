import type { LootTableTemplate } from '../../schema/atropa/loot-table'

interface UserTemplate {
	namespace: string
	pools: (template: Record<string, any>[]) => void
}
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
		const template = {}

		fn(processTemplate(template))
		return template
	} catch (error) {
		throw new Error('Failed to transform loot table:', error as Error)
	}
}

function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		pools: (_template) => {
			template.pools = [..._template, ...(template.pools || [])]
		}
	}
}
