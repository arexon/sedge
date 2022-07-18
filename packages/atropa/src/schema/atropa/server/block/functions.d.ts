interface Description {
	/**
	 * ## Identifier
	 * The identifier for this block.
	 * The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla block.
	 */
	identifier?: string
	/**
	 * ## Is Experimental
	 * If this block is experimental, it will only be registered if the world is marked as experimental.
	 */
	is_experimental?: boolean
}

interface DescriptionProperties {
	/**
	 * ## Properties
	 * Defines block properties and their possible values.
	 */
	properties?: {
		[key: `${string}:${string}`]: string[] | boolean[] | number[]
	}
}

interface DescriptionFunction<WithProperties extends boolean> {
	/**
	 * # Description
	 * The description sets required block information.
	 */
	description: (
		template: WithProperties extends true
			? Description & DescriptionProperties
			: Description
	) => void
}

interface Permutation<T extends object> {
	/**
	 * ## Condition
	 * A MoLang condition.
	 */
	condition?: string
	/**
	 * ## Components
	 * Components to add when the condition evaluates to `true`.
	 */
	components?: T
}

interface PermutationsFunction<T extends object> {
	/**
	 * # Permutations
	 * List of block permutations based on MoLang queries.
	 */
	permutations: (template: Permutation<T>[]) => void
}

interface ComponentsFunction<T extends object> {
	/**
	 * # Compnoents
	 * Components are used to describe the block's attributes and behavior.
	 */
	components: (template: T) => void
}

interface EventsFunction<T extends object> {
	/**
	 * # Events
	 * The events function defines the events that can be triggered by this block.
	 */
	events: (template: Record<string, T>) => void
}

interface UseFunction {
	/**
	 * # Use
	 * Applies custom component(s) to the block.
	 */
	use: (...components: Record<string, any>[]) => void
}

export type {
	DescriptionFunction,
	PermutationsFunction,
	ComponentsFunction,
	EventsFunction,
	UseFunction
}
