import type {
	Description,
	Group,
	IngredientResult,
	InputAndOutput,
	PatternResult,
	Priority,
	Reagent,
	Tags
} from '../../vanilla/recipe'

type FurnaceFunction = {
	/**
	 * ## Recipe Furnace
	 *
	 * Represents a recipe for use with a Furnace.
	 */
	furnace: (template: Description & Tags & Group & InputAndOutput) => void
}

type ShapedFunction = {
	/**
	 * ## Recipe Shaped
	 *
	 * Represents a recipe that requires a dedicated pattern when using a Crafting Table.
	 */
	shaped: (
		template: Description & Tags & Group & Priority & PatternResult
	) => void
}

type ShapelessFunction = {
	/**
	 * ## Recipe Shapeless
	 *
	 * Represents a recipe that does not require a dedicated pattern.
	 */
	shapeless: (
		template: Description & Tags & Group & Priority & IngredientResult
	) => void
}

type BrewingMixFunction = {
	/**
	 * ## Recipe Brewing Mix
	 *
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	brewingMix: (
		template: Description & Tags & InputAndOutput & Reagent
	) => void
}

type BrewingContainerFunction = {
	/**
	 * ## Recipe Brewing Container
	 *
	 * Represents a recipe that for use with a Potion Brewing station.
	 */
	brewingContainer: (
		template: Description & Tags & InputAndOutput & Reagent
	) => void
}

type MaterialReductionFunction = {
	/**
	 * ## Recipe Material Reduction
	 */
	materialReduction: (template: Description & Tags & InputAndOutput) => void
}

export {
	FurnaceFunction,
	ShapedFunction,
	ShapelessFunction,
	BrewingMixFunction,
	BrewingContainerFunction,
	MaterialReductionFunction
}
