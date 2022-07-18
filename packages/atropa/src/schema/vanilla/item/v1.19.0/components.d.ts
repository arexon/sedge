import type { EventTrigger } from '../../event/v1.16.100/triggers'

interface Chargeable {
	/**
	 * ## Chargeable
	 * Allows an item to be used over a duration.
	 * @requires Holiday Creator Features
	 */
	chargeable?: {
		/**
		 * ### On Completed
		 * Event trigger for when the item has completed its use duration.
		 */
		on_completed?: EventTrigger
		/**
		 * ### Movement Modifier
		 * Modifier value to scale the players movement speed when item is in use.
		 */
		movement_modifier?: 0 | 1 | 2 | 3 | 4 | 5
	}
}

export type { Chargeable }
