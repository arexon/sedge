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
		 * ### Custom Description
		 *
		 * Specifies the language file key that maps to what text will be displayed in the UI of this table.
		 * If the string given can not be resolved as a loc string, the raw string given will be displayed.
		 * If this field is omitted, the name displayed will default to the name specified in the `"display_name"` component.
		 * If this block has no `"display_name"` component, the name displayed will default to the name of the block.
		 */
		custom_description?: string

		/**
		 * ### Grid Size
		 *
		 * Recipe grid size.
		 */
		grid_size?: 3

		/**
		 * ### Crafting Tags
		 *
		 * Defines the language file key that maps what text will be displayed in the UI of this table.
		 * If not specified, the name of the block will be used.
		 */
		crafting_tags?: string[]
	}
}
