import type { Subject } from '../../general/filter'

interface EventTrigger {
	/**
	 * ## Condition
	 * This MoLang expression has to evaluate to '1' (true) in order for the event to run.
	 */
	condition?: string

	/**
	 * ## Event
	 * Identifier of the event to trigger
	 */
	event?: string

	/**
	 * ## Target
	 * Target to trigger the event on.
	 * @default 'self'
	 */
	target?: Subject
}

export type { EventTrigger }
