import type { TagTypes } from './general'

type Description = {
	/**
	 * ### Description
	 *
	 * Describes the recipe.
	 */
	description?: {
		/**
		 * #### Identifier
		 *
		 * The identifier of the recipe.
		 */
		identifier: string
	}
}

type Tags = {
	/**
	 * ### Tags
	 *
	 * Item that can create the recipe.
	 */
	tags?: TagTypes[]
}

type Group = {
	/**
	 * ### Group
	 *
	 * The group of the recipe.
	 */
	group?: string
}

type InputAndOutput = {
	/**
	 * ### Input
	 *
	 * Items used as input for the furnace recipe.
	 */
	input?: string

	/**
	 * ### Output
	 *
	 * Items used as output for the furnace recipe.
	 */
	output?: string
}

type Priority = {
	/**
	 * ### Priority
	 *
	 * Sets the priority order of the recipe. Lower numbers represent a higher priority.
	 */
	priority?: number
}

type Result = {
	/**
	 * #### Item
	 *
	 * Provides the identifier of the item.
	 */
	item: string

	/**
	 * #### Data
	 *
	 * Sets the result item's data value.
	 */
	data?: number

	/**
	 * #### Count
	 *
	 * Sets how many of the result item should be output.
	 */
	count?: number
}

type PatternResult = {
	/**
	 * ### Pattern
	 *
	 * Characters that represent a pattern to be defined by keys.
	 */
	pattern?: [string, string, string] | [string, string] | [string]

	/**
	 * ### Keys
	 *
	 * Keys to map characters to item names to be used in `pattern`.
	 */
	key?: {
		[key: string]: {
			/**
			 * #### Item
			 *
			 * Provides the identifier for the result item.
			 */
			item: string

			/**
			 * #### Data
			 *
			 * Sets the result item's data value.
			 */
			data?: number | string
		}
	}

	/**
	 * ### Result
	 *
	 * When input items match the pattern then these items are the result.
	 */
	result?: Result
}

type IngredientResult = {
	/**
	 * ### Ingredients
	 *
	 * Items used as input (without a shape) for the recipe.
	 */
	ingredients?: Result[]

	/**
	 * ### Result
	 *
	 * These items are the result.
	 */
	result?: Result
}

type Reagent = {
	/**
	 * ### Reagent
	 *
	 * Item used in the brewing container recipe with the input potion..
	 */
	reagent?: string
}

type Recipe = {
	/**
	 * ## Recipe Furnace
	 *
	 * Represents a recipe for use with a Furnace.
	 */
	recipe_furnace?: Description & Tags & Group & InputAndOutput

	/**
	 * ## Recipe Shaped
	 *
	 * Represents a recipe that requires a dedicated pattern when using a Crafting Table.
	 */
	recipe_shaped?: Description & Tags & Group & Priority & PatternResult

	/**
	 * ## Recipe Shapeless
	 *
	 * Represents a recipe that does not require a dedicated pattern.
	 */
	recipe_shapeless?: Description & Tags & Group & Priority & IngredientResult

	/**
	 * ## Recipe Brewing Mix
	 *
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	recipe_brewing_mix?: Description & Tags & InputAndOutput & Reagent

	/**
	 * ## Recipe Brewing Container
	 *
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	recipe_brewing_container?: Description & Tags & InputAndOutput & Reagent

	/**
	 * ## Recipe Material Reduction
	 */
	recipe_material_reduction?: Description & Tags & InputAndOutput
}

export {
	Recipe,
	Description,
	Tags,
	Group,
	InputAndOutput,
	Priority,
	PatternResult,
	IngredientResult,
	Reagent
}
