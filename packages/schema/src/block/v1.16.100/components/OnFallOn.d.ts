import { Event } from '../../Event'

export type OnFallOn = {
	/**
	 * ## On Fall On
	 *
	 * Trigger an event when a player falls onto this block.
	 */
	on_fall_on?: {
		/**
		 * ### Min Fall Distance
		 *
		 * The minimum distance in blocks that an actor needs to fall to trigger this event.
		 */
		min_fall_distance?: number
	} & Event
}
