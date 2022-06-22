export type CraftingTable = {
	/**
	 * ## Crafting Table
	 *
	 * Describes the component of a custom crafting table.
	 * This component supports only `"recipe_shaped"` and `"recipe_shapeless"` typed recipes and not others like `"recipe_furnace"` or `"recipe_brewing_mix"`.
	 * If there are two recipes for one item, the recipe book will pick the first that was parsed.
	 * If two input recipes are the same, crafting may assert and the resulting item may vary.
	 *
	 * @requires Holiday Creator Features
	 */
	crafting_table?: {
		/**
		 * ### Table Name
		 *
		 * Specifies the language file key that maps to what text will be displayed in the UI of this table.
		 * If the string given can not be resolved as a loc string, the raw string given will be displayed.
		 * If this field is omitted, the name displayed will default to the name specified in the `"display_name"` component.
		 */
		table_name?: string

		/**
		 * ### Grid Size
		 *
		 * Recipe grid size.
		 */
		grid_size?: 3

		/**
		 * ### Crafting Tags
		 *
		 * Defines the tags recipes should define to be crafted on this table.
		 * Limited to 64 tags.
		 * Each tag is limited to 64 characters.
		 */
		crafting_tags?: string[]
	}
}
