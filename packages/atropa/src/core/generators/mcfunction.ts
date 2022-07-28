import type { Namespace } from './types'

interface MCFunctionTemplate extends Namespace {
	/**
	 * Adds a single command.
	 * @param command The command to add.
	 */
	run: (command: string) => void
}
type MCFunction = string

/**
 * Generates an MC function file. Recommended only for generation of large functions.
 * @param fn A function that defines the MC function.
 * @returns An MC function.
 */
export function defineMCFunction(
	fn: (template: MCFunctionTemplate) => void
): MCFunction {
	const template: string[] = []

	fn(processTemplate(template))

	return template.join('\n')
}

function processTemplate(template: string[]): MCFunctionTemplate {
	return {
		namespace: atropa.config.namespace,
		run: (command: string) => template.push(command)
	}
}
