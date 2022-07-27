import { resolve } from 'pathe'
import { evalModule } from '../../compiler/utils'

interface UseTemplateOptions {
	/**
	 * ## Allow HMR
	 * If true, the file will be allowed to be hot-reloaded.
	 * Useful in development mode when you want to reload the template after it's been changed.
	 * @default false
	 */
	allowHMR?: boolean
}

/**
 * # Use Template
 * Gets a file from the given path.
 * @param path The path to the file.
 * @param options Additional options.
 * @returns The file's content.
 */
export async function useTemplate(
	path: string,
	options?: UseTemplateOptions
): Promise<any> {
	return await evalModule(resolve(path), {
		allowHMR: options?.allowHMR || false
	})
}
