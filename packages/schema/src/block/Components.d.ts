export type ComponentsFunction<Type extends unknown> = {
	/**
	 * # Compnoents
	 *
	 * Components are used to describe the block's attributes and behavior.
	 */
	components: (template: Type) => void
}
