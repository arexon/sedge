interface UseFunction {
	/**
	 * # Use
	 * Applies custom component(s).
	 * @param components A spreadable array of components to apply.
	 */
	use(...components: Record<string, any>[]): void
}

export type { UseFunction }
