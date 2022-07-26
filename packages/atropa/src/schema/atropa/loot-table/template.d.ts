import type { Pools } from '../../vanilla/loot-table'
import type { UseFunction } from '../common/functions'
import type { Namespace } from '../common/template'

interface LootTableTemplate extends Namespace, UseFunction {
	/**
	 * ## Pools
	 * Lists the loot pools for this loot table.
	 * @param template The pools to add to the loot table.
	 */
	pools(template: Pools[]): void
}

export type { LootTableTemplate }
