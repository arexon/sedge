export type EventsFunction<Type> = {
	/**
	 * # Events
	 *
	 * The events function defines the events that can be triggered by this block.
	 */
	events: (template: Record<string, Type>) => void
}
