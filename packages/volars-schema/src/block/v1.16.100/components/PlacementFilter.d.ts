type PlacementRules = {
	/**
	 * ### Placement Rules
	 *
	 * List of conditions where the block can be placed/survive.
	 * Limited to 64 conditions.
	 */
	placement_rules?: {
		/**
		 * #### Allowed Faces
		 *
		 * List of directions. Limited to 6 faces.
		 */
		allowed_faces?: (
			| 'up'
			| 'down'
			| 'north'
			| 'east'
			| 'south'
			| 'west'
			| 'side'
			| 'all'
		)[]
		/**
		 * #### Block Filter
		 *
		 * List of blocks (can use tags to specify them) that this block can be placed against in the allowed_faces direction.
		 * Limited to 64 blocks.
		 */
		block_filter?: string[]
	}
}

export type PlacementFilter = {
	/**
	 * ## Placement Filter
	 *
	 * Sets rules for under what conditions the block can be placed/survive.
	 *
	 * @requires Holiday Creator Features
	 */
	placement_filter?: PlacementRules | PlacementRules[]
}
