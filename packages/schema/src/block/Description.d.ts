export type Description = {
	/**
	 * ## Identifier
	 *
	 * The identifier for this block.
	 * The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla block.
	 */
	identifier: string

	/**
	 * ## Is Experimental
	 *
	 * If this block is experimental, it will only be registered if the world is marked as experimental.
	 */
	is_experimental?: boolean
}

export type Properties = {
	/**
	 * ## Properties
	 *
	 * Defines block properties and their possible values.
	 */
	properties?: {
		[key: `${string}:${string}`]: (string | boolean | number)[]
	}
}
