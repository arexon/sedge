import type {
	RecipeBrewingContainer,
	RecipeBrewingMix,
	RecipeMaterialReduction,
	RecipeShaped,
	RecipeShapeless,
	RecipeFurnace
} from '../../../vanilla/recipe'

type FurnaceFunction = {
	/**
	 * ## Recipe Furnace
	 * Represents a recipe for use with a Furnace.
	 */
	furnace: (template: RecipeFurnace) => void
}

type ShapedFunction = {
	/**
	 * ## Recipe Shaped
	 * Represents a recipe that requires a dedicated pattern when using a Crafting Table.
	 */
	shaped: (template: RecipeShaped) => void
}

type ShapelessFunction = {
	/**
	 * ## Recipe Shapeless
	 * Represents a recipe that does not require a dedicated pattern.
	 */
	shapeless: (template: RecipeShapeless) => void
}

type BrewingMixFunction = {
	/**
	 * ## Recipe Brewing Mix
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	brewingMix: (template: RecipeBrewingMix) => void
}

type BrewingContainerFunction = {
	/**
	 * ## Recipe Brewing Container
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	brewingContainer: (template: RecipeBrewingContainer) => void
}

type MaterialReductionFunction = {
	/**
	 * ## Recipe Material Reduction
	 */
	materialReduction: (template: RecipeMaterialReduction) => void
}

export type {
	FurnaceFunction,
	ShapedFunction,
	ShapelessFunction,
	BrewingMixFunction,
	BrewingContainerFunction,
	MaterialReductionFunction
}
