import type { EffectNames } from '../../general/effect'
import type { LegacyFoodEffects } from '../general/legacy-food-effects'

interface Foil {
	/**
	 * ## Foil
	 * Foil or enchantment glint on the item.
	 */
	foil?: boolean
}

interface Food {
	/**
	 * ## Food
	 * Makes the item become edible to the player.
	 */
	food?: {
		/**
		 * ### Nutrition
		 * The amount of nutrition the item provides when eaten.
		 */
		nutrition?: number

		/**
		 * ### Can Always Eat
		 * If true, the player can always eat this item (even when not hungry).
		 * @default false
		 */
		can_always_eat?: boolean

		/**
		 * ### Saturation Modifier
		 * Saturation Modifier is used in this formula: (`nutrition` * `saturation_modifier` * 2) when appling the saturation buff. Which happens when you eat the item.
		 */
		saturation_modifier?: number

		/**
		 * ### Using Converts To
		 * When used, convert the *this* item to the one specified.
		 */
		using_converts_to?: string

		/**
		 * ### Effects
		 * Effects to apply when the item is eaten.
		 */
		effects?: LegacyFoodEffects

		/**
		 * ### Remove Effects
		 * Effects to remove when the item is eaten.
		 */
		remove_effects?: EffectNames

		/**
		 * ### On Use Action
		 * An action to trigger when the item is used.
		 */
		on_use_action?: 'chorus_teleport' | 'suspicious_stew_effect' | 'none'

		/**
		 * ### On Use Range
		 * The range of the action effect.
		 */
		on_use_range?: [number, number, number]

		/**
		 * ### Cooldown Type
		 * The type of cooldown to apply to the item.
		 */
		cooldown_type?: 'chorus_fruit'

		/**
		 * ### Cooldown Time
		 * The time in seconds before the item can be used again.
		 */
		cooldown_time?: number
	}
}

interface HandEquipped {
	/**
	 * ## Hand Equipped
	 * Whether or not the item is hand equipped.
	 */
	hand_equipped?: boolean
}

interface MaxDamage {
	/**
	 * ## Max Damage
	 * Max damage item has, this is used like item max health.
	 */
	max_damage?: number
}

interface MaxStackSize {
	/**
	 * ## Max Stack Size
	 * The max stack size of the item.
	 * @default 64
	 */
	max_stack_size?: number
}

interface StackedByData {
	/**
	 * ## Stacked By Data
	 * Stacked by data aux value or not.
	 */
	stacked_by_data?: boolean
}

interface UseDuration {
	/**
	 * ## Use Duration
	 * How long to use before item is done being used.
	 */
	use_duration?: number
}

export type {
	Foil,
	Food,
	HandEquipped,
	MaxDamage,
	MaxStackSize,
	StackedByData,
	UseDuration
}
