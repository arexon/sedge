import type { FormatVersion } from '../vanilla/formatVersion'
import type { BlockTemplate } from '../vanilla/block'

/**
 * # Define Block
 *
 * Generates a new block based on the given templates.
 * @param version The format version of the block.
 * @param block A callback function with function parameters used to define the block.
 * @returns An object representation of the block.
 */
declare function defineBlock<T extends FormatVersion>(
	version: T,
	block: (template: BlockTemplate<T>) => void
): Promise<object>

export { defineBlock }
