type Hook = 'on:build' | 'on:dev'

/**
 * # Use Hook
 * Hooks allow to run code at a specific event(s), such as `on:build` or `on:dev`.
 * @param hook The hook to hook into.
 * @param fn The function to invoke when the hook is called.
 */
export function useHook(hook: Hook | Hook[], fn: () => void): void {
	if (Array.isArray(hook)) hook.map((hook) => useHook(hook, fn))

	if (hook === 'on:build' && atropa.mode === 'build') fn()
	else if (hook === 'on:dev' && atropa.mode === 'dev') fn()
}
