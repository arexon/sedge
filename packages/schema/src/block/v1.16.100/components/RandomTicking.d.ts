import { Event } from '../../Event'

export type RandomTicking = {
	/**
	 * ## Random Ticking
	 *
	 * Triggers the specified event randomly based on the random tick speed gamerule.
	 * The random tick speed determines how often blocks are updated. Some other examples of game mechanics that use random ticking are crop growth and fire spreading.
	 *
	 * @requires Holiday Creator Features
	 */
	random_ticking?: {
		/**
		 * ### On Tick
		 *
		 * The event that will be triggered on random ticks.
		 */
		on_tick?: Event
	}
}
