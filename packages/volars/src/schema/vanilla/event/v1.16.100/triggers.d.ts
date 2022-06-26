type EventTrigger = {
	/**
	 * ## Condition
	 *
	 * This MoLang expression has to evaluate to '1' (true) in order for the event to run.
	 */
	condition?: string

	/**
	 * ## Event
	 *
	 * Identifier of the event to trigger
	 */
	event?: string

	/**
	 * ## Target
	 *
	 * Target to trigger the event on.
	 */
	target?: 'self' | 'other' | 'target' | 'parent' | 'baby'
}

export { EventTrigger }
