type Description = {
	/**
	 * ## Identifier
	 *
	 * The identifier for this block.
	 * The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla block.
	 */
	identifier?: string

	/**
	 * ## Is Experimental
	 *
	 * If this block is experimental, it will only be registered if the world is marked as experimental.
	 */
	is_experimental?: boolean
}

type DescriptionProperties = {
	/**
	 * ## Properties
	 *
	 * Defines block properties and their possible values.
	 */
	properties?: {
		[key: `${string}:${string}`]: string[] | boolean[] | number[]
	}
}

type DescriptionFunction<WithProperties extends boolean> = {
	/**
	 * # Description
	 *
	 * The description sets required block information.
	 */
	description: (
		template: WithProperties extends true
			? Description & DescriptionProperties
			: Description
	) => void
}

type Permutation<T extends object> = {
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
	components?: T
}

type PermutationsFunction<T extends object> = {
	/**
	 * # Permutations
	 *
	 * List of block permutations based on MoLang queries.
	 */
	permutations: (template: Permutation<T>[]) => void
}

type ComponentsFunction<T extends object> = {
	/**
	 * # Compnoents
	 *
	 * Components are used to describe the block's attributes and behavior.
	 */
	components: (template: T) => void
}

type EventsFunction<T extends object> = {
	/**
	 * # Events
	 *
	 * The events function defines the events that can be triggered by this block.
	 */
	events: (template: Record<string, T>) => void
}

export {
	DescriptionFunction,
	PermutationsFunction,
	ComponentsFunction,
	EventsFunction
}
