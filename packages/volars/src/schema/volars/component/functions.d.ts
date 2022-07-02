import type { Loot } from '../../vanilla/loot'

type LootTable = {
	/**
	 * # Loot Table
	 *
	 * Defines a loot table that is generated with the provided template at build time.
	 */
	lootTable: (template: Loot, path: string) => void
}

export { LootTable }
