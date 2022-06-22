export type Flammable = {
	/**
	 * ## Flammable
	 *
	 * Describes the flammable properties for this block.
	 */
	flammable?: {
		/**
		 * ### Burn Odds
		 *
		 * How likely the block will be destroyed by flames when on fire.
		 * Value must be greater than or equal to 0.
		 *
		 * @default 0
		 */
		burn_odds?: number

		/**
		 * ### Flame Odds
		 *
		 * How likely the block will catch flame when next to a fire.
		 * Value must be greater than or equal to 0.
		 *
		 * @default 0
		 */
		flame_odds?: number
	}
}
