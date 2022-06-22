export type QueuedTicking = {
	/**
	 * ## Queued Ticking
	 *
	 * Triggers the specified event, either once, or at a regular interval equal to a number of ticks randomly chosen from the interval_range provided.
	 */
	queued_ticking?: {
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
		 * ### Interval Range
		 *
		 * The Range between which the component will trigger this event.
		 *
		 * @default [10, 10]
		 */
		interval_range?: [number, number]

		/**
		 * ### On Tick
		 *
		 * The event that will be triggered once or on an interval.
		 */
		on_tick?: Event
	}
}
