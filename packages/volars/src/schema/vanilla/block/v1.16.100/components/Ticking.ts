import { Event } from '../../Event'

export type Ticking = {
	/**
	 * ## Ticking
	 *
	 * Triggers the specified event, either once, or at a regular interval equal to a number of ticks randomly chosen from the range provided.
	 *
	 * @requires Holiday Creator Features
	 */
	ticking?: {
		/**
		 * ### Looping
		 *
		 * Does the event loop.
		 * If false, the event will only be triggered once, after a delay equal to a number of ticks randomly chosen from the range.
		 * If true, the event will loop, and each interval between events will be equal to a number of ticks randomly chosen from the range.
		 *
		 * @default true
		 */
		looping?: boolean

		/**
		 * ### Range
		 *
		 * The Range between which the component will trigger this event.
		 *
		 * @default [10, 10]
		 */
		range?: [number, number]

		/**
		 * ### On Tick
		 *
		 * The event that will be triggered once or on an interval.
		 */
		on_tick?: Event
	}
}
