import type { Range } from '../general/common'
import type { EnchantmentNames } from '../general/vanilla'
import type { Functions } from './functions'

type Conditions =
	| {
			condition?: 'has_mark_variant'
			value?: number
	  }
	| {
			condition?: 'entity_properties'
			entity?: 'this'
			properties?: {
				on_fire?: boolean
			}
	  }
	| {
			condition?: 'match_tool'
			item?: string
			count?: number
			enchantments?: {
				enchantment?: EnchantmentNames
			} & Range
	  }
	| {
			condition?: 'random_chance'
			chance?: number
	  }
	| {
			condition?: 'random_chance_with_looting'
			chance?: number
			looting_multiplier?: number
	  }
	| {
			condition?: 'random_difficulty_chance'
			default_chance?: number
			peaceful?: number
			hard?: number
	  }
	| {
			condition?: 'random_regional_difficulty_chance'
			max_chance?: number
	  }

type Entries =
	| {
			type?: 'item'
			/**
			 * ### Weight
			 *
			 * How likely it is that this entry will be chosen.
			 */
			weight?: number
			/**
			 * ### Name
			 *
			 * An item identifier to be chosen.
			 */
			name?: string
			/**
			 * ### Pools
			 *
			 * The pools that this entry can spawn.
			 */
			pools?: Pools[]
			/**
			 * ### Functions
			 *
			 * Functions that can be called on this entry.
			 */
			functions?: Functions
	  }
	| {
			type?: 'loot_table'
			/**
			 * ### Weight
			 *
			 * How likely it is that this entry will be chosen.
			 */
			weight?: number
			/**
			 * ### Name
			 *
			 * Path to a loot table to be chosen.
			 */
			name?: string
	  }
	| {
			type?: 'empty'
			/**
			 * ### Weight
			 *
			 * How likely it is that this entry will be chosen.
			 */
			weight?: number
	  }

type Pools = {
	/**
	 * ## Condition
	 *
	 * A list of conditions for the pool to pass.
	 */
	conditions?: Conditions[]

	/**
	 * ## Tiers
	 *
	 * The tiers that this pool can spawn.
	 */
	tiers?: {
		initial_range?: number
		bonus_rolls?: number
		bonus_chance?: number
	}

	/**
	 * ## Rolls
	 *
	 * The amount of times that this pool will roll.
	 */
	rolls?: Range | number

	/**
	 * ## Entries
	 *
	 * Lists the entries of the loot table to be chosen from.
	 */
	entries?: Entries
}

type Loot = {
	/**
	 * ## Pools
	 *
	 * Lists the loot pools for this loot table.
	 */
	pools?: Pools[]
}

export { Loot }
