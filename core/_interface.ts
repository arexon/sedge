export interface UseFunction {
	/**
	 * # Use
	 * Applies custom component(s).
	 * @param components A spreadable array of components to apply.
	 */
	use(...components: Record<string, any>[]): void;
}

export interface Namespace {
	/**
	 * # Namespace
	 * The project namespace defined in `config.json`.
	 */
	namespace: string;
}

export interface Description {
	/**
	 * ## Identifier
	 * The name must include a namespace and must not use the Minecraft namespace unless you want to override it.
	 */
	identifier?: string;
}

export interface DescriptionExperimental {
	/**
	 * ## Is Experimental
	 * If true, it will only be registered if the world is marked as experimental.
	 * @default false
	 */
	is_experimental?: boolean;
}
