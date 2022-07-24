import type { Range } from '../general/common'
import type {
	ColorPalette,
	EnchantmentNames,
	PatternTypes,
	Structures
} from '../general/vanilla'

type Functions =
	| {
			function: 'enchant_book_for_trading'
			base_cost?: number
			base_random_cost?: number
			per_level_cost?: number
			per_level_random_cost?: number
	  }
	| {
			function: 'enchant_random_gear'
			chance?: number
	  }
	| {
			function: 'enchant_randomly'
			treasure?: boolean
	  }
	| {
			function: 'enchant_with_levels'
			treasure?: boolean
			levels?: Range
	  }
	| {
			function: 'exploration_map'
			destination?: Structures
	  }
	| {
			function: 'fill_container'
			loot_table?: string
	  }
	| {
			function: 'random_aux_val'
			values?: Range
	  }
	| {
			function: 'random_block_state'
			block_state?: 'color' | string
	  }
	| {
			function: 'looting_enchant'
			count?: Range
	  }
	| {
			function: 'set_actor_id'
			id?: string
	  }
	| {
			function: 'set_banner_details'
			type?: 'default' | 'illager_captain'
			base_color?: ColorPalette
			patterns?: {
				pattern?: PatternTypes
				color?: ColorPalette
			}
	  }
	| {
			function: 'set_book_contents'
			author?: string
			title?: string
			pages?: string[]
	  }
	| {
			function: 'set_count'
			count?: Range
	  }
	| {
			function: 'set_damage'
			damage?: Range
	  }
	| {
			function: 'set_data'
			data?: Range
	  }
	| {
			function: 'set_lore'
			lore?: string[]
	  }
	| {
			function: 'set_name'
			name?: string
	  }
	| {
			function: 'specific_enchants'
			enchants?: {
				id?: EnchantmentNames
				level?: number | [number, number]
			}[]
	  }

export type { Functions }
