interface DestoryTime {
	/**
	 * ## Destroy Time
	 *
	 * Sets the destroy time property for the block.
	 * Greater numbers result in greater mining times.
	 * Time is measured in seconds with base equipment.
	 *
	 * @default 0.0
	 */
	destroy_time?: number
}

interface ExplosionResistance {
	/**
	 * ## Explosion Resistance
	 *
	 * Sets the explosion resistance for this block.
	 *
	 * @default 0.0
	 */
	explosion_resistance?: number
}

interface Flammable {
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

interface Friction {
	/**
	 * ## Friction
	 *
	 * Property describing the friction for this block in a range of `[0.1, 1.0]`.
	 * Friction affects an entity's movement speed when it travels on the block.
	 * Greater value results in less friction.
	 *
	 * @default 0.6
	 */
	friction?: number
}

interface Loot {
	/**
	 * ## Loot
	 *
	 * The path to the loot table, relative to the behavior pack.
	 */
	loot?: string
}

interface MapColor {
	/**
	 * ## Map Color
	 *
	 * Sets the color of the block when rendered to a map.
	 * The color is represented as a hex value in the format "#RRGGBB".
	 * May also be expressed as an array of `"[R, G, B]"` from 0 to 255.
	 *
	 * @default '#RRGGBB'
	 */
	map_color?: string
}

export { DestoryTime, ExplosionResistance, Flammable, Friction, Loot, MapColor }
