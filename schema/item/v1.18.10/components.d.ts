import { EventTrigger } from '../../event/v1.16.100/triggers.d.ts';

interface Food {
	/**
	 * ## Food
	 * Makes the item become edible to the player.
	 * @requires Holiday Creator Features
	 */
	food?: {
		/**
		 * ### Nutrition
		 * The amount of nutrition the item provides when eaten.
		 */
		nutrition?: number;
		/**
		 * ### Can Always Eat
		 * If true, the player can always eat this item (even when not hungry).
		 * @default false
		 */
		can_always_eat?: boolean;
		/**
		 * ### Saturation Modifier
		 * Saturation Modifier is used in this formula: (`nutrition` * `saturation_modifier` * 2) when appling the saturation buff. Which happens when you eat the item.
		 */
		saturation_modifier?:
			| 'poor'
			| 'low'
			| 'normal'
			| 'good'
			| 'max'
			| 'supernatural';
		/**
		 * ### Using Converts To
		 * When used, convert the *this* item to the one specified.
		 */
		using_converts_to?: string;
		/**
		 * ### On Consume
		 * Event to fire once the item has been consumed.
		 */
		on_consume?: EventTrigger;
	};
}

interface ItemStorage {
	/**
	 * ## Item Storage
	 * The storage item component is used for storing items within an item's user data.
	 * @requires Holiday Creator Features
	 */
	item_storage?: {
		/**
		 * ### Capacity
		 * The max capacity of the item.
		 * @default 64
		 */
		capacity?: number;
	};
}

export { Food, ItemStorage };
