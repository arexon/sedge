import type {
	RecipeBrewingContainer,
	RecipeBrewingMix,
	RecipeFurnace,
	RecipeMaterialReduction,
	RecipeShaped,
	RecipeShapeless
} from '../../vanilla/recipe'

type FurnaceFunction = {
	/**
	 * ## Recipe Furnace
	 * Represents a recipe for use with a Furnace.
	 * @param template The furnace recipe template.
	 */
	furnace(template: RecipeFurnace): void
}

type ShapedFunction = {
	/**
	 * ## Recipe Shaped
	 * Represents a recipe that requires a dedicated pattern when using a Crafting Table.
	 * @param template The shaped recipe template.
	 */
	shaped(template: RecipeShaped): void
}

type ShapelessFunction = {
	/**
	 * ## Recipe Shapeless
	 * Represents a recipe that does not require a dedicated pattern.
	 * @param template The shapeless recipe template.
	 */
	shapeless(template: RecipeShapeless): void
}

type BrewingMixFunction = {
	/**
	 * ## Recipe Brewing Mix
	 * Represents a recipe that for use with a Potion Brewing station.
	 * @param template The brewing mix recipe template.
	 */
	brewingMix(template: RecipeBrewingMix): void
}

type BrewingContainerFunction = {
	/**
	 * ## Recipe Brewing Container
	 * Represents a recipe that for use with a Potion Brewing station.
	 * @param template The brewing container recipe template.
	 */
	brewingContainer(template: RecipeBrewingContainer): void
}

type MaterialReductionFunction = {
	/**
	 * ## Recipe Material Reduction
	 * @param template The material reduction recipe template.
	 */
	materialReduction(template: RecipeMaterialReduction): void
}

export type {
	FurnaceFunction,
	ShapedFunction,
	ShapelessFunction,
	BrewingMixFunction,
	BrewingContainerFunction,
	MaterialReductionFunction
}
