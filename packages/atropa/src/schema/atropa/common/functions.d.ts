interface UseFunction {
	/**
	 * # Use
	 * Applies custom component(s).
	 */
	use: (...components: Record<string, any>[]) => void
}

export type { UseFunction }
