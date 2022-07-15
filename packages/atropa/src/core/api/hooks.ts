import { createHooks } from 'hookable'

type Hook = 'on:build' | 'on:dev'

export const hooks = createHooks<{
	[key in Hook]: () => void
}>()

export function useHook(hook: Hook, fn: () => void): void {
	hooks.hookOnce(hook, fn)
}
