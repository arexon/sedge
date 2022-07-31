import { tryCatch } from '../utils'
import type { Namespace } from './types'

interface MCFunctionTemplate extends Namespace {
	/**
	 * Adds a single command or multiple commands.
	 * @param template The command(s) to add.
	 */
	run(template: string | string[]): void
}
interface MCFunctionResult {
	type: 'mcfunction'
	data: string
}

/**
 * Generates an MC function file. Recommended only for complex functions.
 * @param fn A function that defines the MC function.
 * @returns A module result that contains the MC function.
 */
export function defineMCFunction(
	fn: (template: MCFunctionTemplate) => void
): MCFunctionResult {
	return tryCatch(() => {
		const template: string[] = []

		fn(processTemplate(template))

		return {
			type: 'mcfunction',
			data: template.join('\n')
		}
	}, 'Failed to transform mcfunction template')
}

function processTemplate(template: string[]): MCFunctionTemplate {
	return {
		namespace: atropa.config.namespace,
		run: (_template) => {
			if (Array.isArray(_template)) template.push(_template.join('\n'))
			else template.push(_template)
		}
	}
}
