import type { Pools } from '../../vanilla/loot-table'
import type { Namespace } from '../common/template'

interface LootTableTemplate extends Namespace {
	/**
	 * ## Pools
	 * Lists the loot pools for this loot table.
	 */
	pools: (template: Pools[]) => void
}

export type { LootTableTemplate }
