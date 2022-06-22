export type Flammable = {
	/**
	 * ## Flammable
	 *
	 * Describes the flammable properties for this block.
	 * If set to true, default values are used.
	 * If set to false, this block will not be able to catch on fire.
	 * If this component is omitted, the block will not be able to catch on fire naturally from neighbors or lava, but it can still be directly ignited, and that fire will be able to spread to neighbor blocks.
	 */
	flammable?:
		| {
				/**
				 * ### Catch Chance Modifier
				 *
				 * A modifier affecting the chance that this block will catch flame when next to a fire.
				 * Values are greater than or equal to 0, with a higher number meaning more likely to catch on fire.
				 *
				 * @default 5
				 */
				catch_chance_modifier?: number

				/**
				 * ### Destroy Chance Modifier
				 *
				 * How likely the block will be destroyed by flames when on fire.
				 * Value must be greater than or equal to 0.
				 *
				 * @default 20
				 */
				destroy_chance_modifier?: number
		  }
		| boolean
}
