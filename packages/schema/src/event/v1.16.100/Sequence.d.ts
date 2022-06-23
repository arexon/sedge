export type Sequence<Type> = {
	/**
	 * ## Sequence
	 *
	 * Runs a sequence of events.
	 */
	sequence?: ({
		/**
		 * ### Condition
		 *
		 * A MoLang that when evaluated to true will cause this event to run.
		 */
		condition?: string
	} & Type)[]
}
