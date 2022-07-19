type Namespace = {
	/**
	 * # Namespace
	 * The project namespace defined in `config.json`.
	 */
	namespace: string
}

interface Description {
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

export type { Description, Namespace }
