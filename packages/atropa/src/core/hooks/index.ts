import { createHooks } from 'hookable'

type Hook = 'on:build' | 'on:dev@initial' | 'on:dev@reload'

export const hooks = createHooks<{
	[key in Hook]: () => void
}>()

/**
 * Hooks allow to run code at specific event, such as `on:build` or `on:dev@initial`.
 * @param hook The hook to hook into.
 * @param fn The function to invoke when the hook is called.
 */
export function useHook(hook: Hook | Hook[], fn: () => void): void {
	if (Array.isArray(hook)) {
		hook.map((hook) => hooks.hookOnce(hook, fn))
		return
	}
	hooks.hookOnce(hook, fn)
}
