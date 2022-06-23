export type SetBlockProperty = {
	/**
	 * ## Set Block Property
	 *
	 * Sets a block property on this block.
	 */
	set_block_property?: {
		/**
		 * ### Block Property
		 *
		 * Block property to set on the block.
		 */
		[name: string]: string | number | boolean
	}
}
