import { createHooks } from 'hookable'

type Hook = 'on:build' | 'on:dev@initial' | 'on:dev@reload'

export const hooks = createHooks<{
	[key in Hook]: () => void
}>()

export function useHook(hook: Hook | Hook[], fn: () => void): void {
	if (Array.isArray(hook)) {
		hook.map((hook) => hooks.hookOnce(hook, fn))
		return
	}
	hooks.hookOnce(hook, fn)
}
