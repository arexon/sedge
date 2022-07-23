import {
	processTemplate,
	transformTemplate
} from '../compiler/transformers/block'
import type {
	BlockTemplate,
	BlockFormatVersion
} from '../schema/atropa/server/block'

/**
 * # Define Block
 *
 * Generates a new block based on the given templates.
 * @param version The format version of the block.
 * @param fn A callback function with function parameters used to define the block.
 * @returns A block.
 */
export function defineBlock<Version extends BlockFormatVersion>(
	version: Version,
	fn: (template: BlockTemplate<Version>) => void
): Record<string, any> {
	try {
		const template = {}

		fn(processTemplate(template) as BlockTemplate<Version>)
		return transformTemplate(template, version)
	} catch (error) {
		throw new Error(`Failed to transform block template`, error as Error)
	}
}
