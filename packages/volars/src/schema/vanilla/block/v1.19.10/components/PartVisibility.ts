export type PartVisibility = {
	/**
	 * ## Part Visibility
	 *
	 * Sets conditions for when the block's different parts are visible.
	 *
	 * @requires Upcoming Creator Features
	 */
	part_visibility?: {
		/**
		 * ### Rules
		 *
		 * A JSON object that contains a list of key/value pairs that map from bone name in a geometry file (key) to a condition that turns their rendering on/off (value).
		 * The condition should be a Molang query that uses block properties to determine true/false.
		 * Supported queries include `'has_block_property'`, `'block_property'`, and other queries that can evaluate without knowledge of the block's in-game positional or player affected data.
		 */
		conditions?: {
			[key: string]: string
		}
	}
}
