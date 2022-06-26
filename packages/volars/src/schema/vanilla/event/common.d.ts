type Randomize<T extends object> = {
	/**
	 * ## Randomize
	 *
	 * Runs a random event based on given weight.
	 */
	randomize?: ({
		/**
		 * ### Weight
		 *
		 * How likely the event is to run.
		 */
		weight: number

		/**
		 * ### Condition
		 *
		 * A MoLang that when evaluated to true will cause the event to run.
		 */
		condition?: string
	} & T)[]
}

type Sequence<T extends object> = {
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
	} & T)[]
}

export { Randomize, Sequence }
