export type SetBlockAtPos = {
	/**
	 * ## Set Block At Pos
	 *
	 * Sets a block relative to this block to another block type.
	 */
	set_block_at_pos?: {
		/**
		 * ### Block Offset
		 *
		 * The offset from the block's center.
		 *
		 * @default [0.0, 0.0, 0.0]
		 */
		block_offset?: [number, number, number]

		/**
		 * ### Block Type
		 *
		 * The type of block to set.
		 */
		block_type: string
	}
}
