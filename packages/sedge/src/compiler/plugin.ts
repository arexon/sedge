import { createHooks } from 'hookable'

interface PluginHooks {
	/**
	 * Runs once before the compiler starts.
	 */
	buildStart?(): Promise<void> | void

	/**
	 * Transforms a compiled file.
	 * @param path The path of the original file.
	 * @param content The content of the compiled file.
	 */
	transformFile?(path: string, content: any): Promise<any> | any
}

export const pluginHooks = createHooks<Required<PluginHooks>>()

export function definePlugin(hooks: PluginHooks) {
	if (Object.keys(hooks).length === 0) {
		throw new Error('At least one hook is required in `definePlugin`')
	}

	if (hooks.buildStart) {
		pluginHooks.hookOnce('buildStart', hooks.buildStart)
	}
	if (hooks.transformFile) {
		pluginHooks.hook('transformFile', hooks.transformFile)
	}
}
