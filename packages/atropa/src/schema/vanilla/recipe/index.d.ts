import type { TagTypes } from './general'

interface Description {
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

interface Tags {
	/**
	 * ### Tags
	 *
	 * Item that can create the recipe.
	 */
	tags?: TagTypes[]
}

interface Group {
	/**
	 * ### Group
	 *
	 * The group of the recipe.
	 */
	group?: string
}

interface InputAndOutput {
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

interface Priority {
	/**
	 * ### Priority
	 *
	 * Sets the priority order of the recipe. Lower numbers represent a higher priority.
	 */
	priority?: number
}

interface Result {
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

interface PatternResult {
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

interface IngredientResult {
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

interface Reagent {
	/**
	 * ### Reagent
	 *
	 * Item used in the brewing container recipe with the input potion..
	 */
	reagent?: string
}

interface RecipeFurnace extends Description, Tags, Group, InputAndOutput {}
interface RecipeShaped
	extends Description,
		Tags,
		Group,
		Priority,
		PatternResult {}
interface RecipeShapeless
	extends Description,
		Tags,
		Group,
		Priority,
		IngredientResult {}
interface RecipeBrewingMix extends Description, Tags, InputAndOutput, Reagent {}
interface RecipeBrewingContainer
	extends Description,
		Tags,
		InputAndOutput,
		Reagent {}
interface RecipeMaterialReduction extends Description, Tags, InputAndOutput {}

interface Recipe {
	/**
	 * ## Recipe Furnace
	 *
	 * Represents a recipe for use with a Furnace.
	 */
	recipe_furnace?: RecipeFurnace

	/**
	 * ## Recipe Shaped
	 *
	 * Represents a recipe that requires a dedicated pattern when using a Crafting Table.
	 */
	recipe_shaped?: RecipeShaped

	/**
	 * ## Recipe Shapeless
	 *
	 * Represents a recipe that does not require a dedicated pattern.
	 */
	recipe_shapeless?: RecipeShapeless

	/**
	 * ## Recipe Brewing Mix
	 *
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	recipe_brewing_mix?: RecipeBrewingMix

	/**
	 * ## Recipe Brewing Container
	 *
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	recipe_brewing_container?: RecipeBrewingContainer

	/**
	 * ## Recipe Material Reduction
	 */
	recipe_material_reduction?: RecipeMaterialReduction
}

export type {
	Recipe,
	RecipeFurnace,
	RecipeShaped,
	RecipeShapeless,
	RecipeBrewingMix,
	RecipeBrewingContainer,
	RecipeMaterialReduction
}
