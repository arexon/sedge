import { resolve } from 'pathe'
import { evalModule } from '../../compiler/utils'

interface UseTemplateOptions {
	/**
	 * ## Allow HMR
	 * Whether or not to allow hot module replacement.
	 * Useful in development mode when you want to reload the template after it's been changed.
	 * @default false
	 */
	allowHMR?: boolean
}

/**
 * # Use Template
 * Imports the compiled version of a generator files as a template.
 * @param path The path to the file.
 * @param options Additional options.
 * @returns The file's contents.
 */
export async function useTemplate(
	path: string,
	options?: UseTemplateOptions
): Promise<any> {
	const result = await evalModule(resolve(path), {
		allowHMR: options?.allowHMR || false
	})
	return result?.data
}
