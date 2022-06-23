export type PermutationsFunction<Components extends Object> = {
	/**
	 * # Permutations
	 *
	 * List of block permutations based on MoLang queries.
	 */
	permutations: (
		template: {
			/**
			 * ## Condition
			 *
			 * A MoLang condition.
			 */
			condition?: string

			/**
			 * ## Components
			 *
			 * Components to add when the condition evaluates to `true`.
			 */
			components?: Components
		}[]
	) => void
}
