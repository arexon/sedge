import type { FormatVersion } from '../../vanilla/formatVersion'
import type { BlockTemplate } from './template'

/**
 * # Define Block
 *
 * Generates a new block based on the given templates.
 * @param version The format version of the block.
 * @param block A callback function with function parameters used to define the block.
 * @param components A list of reusable components that will be applied to the block.
 * @returns An object representation of the block.
 */
declare function defineBlock<T extends FormatVersion>(
	version: T,
	block: (template: BlockTemplate<T>) => void,
	components?: object[]
): Promise<object>

export { defineBlock }
