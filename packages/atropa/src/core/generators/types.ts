export interface UseFunction {
	/**
	 * # Use
	 * Applies custom component(s).
	 * @param components A spreadable array of components to apply.
	 */
	use(...components: Record<string, any>[]): void
}

export type Namespace = {
	/**
	 * # Namespace
	 * The project namespace defined in `config.json`.
	 */
	namespace: string
}

export interface Description {
	/**
	 * ## Identifier
	 * The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla block.
	 */
	identifier?: string
	/**
	 * ## Is Experimental
	 * If true, it will only be registered if the world is marked as experimental.
	 * @default false
	 */
	is_experimental?: boolean
}
