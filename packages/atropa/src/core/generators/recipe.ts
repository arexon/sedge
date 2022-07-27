import { deepMerge, objectMap } from '@antfu/utils'
import { UseFunction } from '../../schema/atropa/common/functions'
import { Namespace } from '../../schema/atropa/common/template'
import type {
	RecipeBrewingContainer,
	RecipeBrewingMix,
	RecipeFurnace,
	RecipeMaterialReduction,
	RecipeShaped,
	RecipeShapeless
} from '../../schema/vanilla/recipe'
import { tryCatch } from '../utils'

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

export interface RecipeTemplate
	extends Namespace,
		FurnaceFunction,
		ShapedFunction,
		ShapelessFunction,
		BrewingMixFunction,
		BrewingContainerFunction,
		MaterialReductionFunction,
		UseFunction {}

type UserTemplate = Partial<RecipeTemplate>
interface VanillaTemplate {
	recipe?: Record<string, any>
}
interface Recipe {
	format_version: string
	'minecraft:recipe_shaped'?: VanillaTemplate
	'minecraft:recipe_shapeless'?: VanillaTemplate
	'minecraft:recipe_furnace'?: VanillaTemplate
	'minecraft:recipe_brewing_container'?: VanillaTemplate
	'minecraft:recipe_brewing_mix'?: VanillaTemplate
	'minecraft:recipe_material_reduction'?: VanillaTemplate
}

/**
 * # Define Recipe
 * Generates a recipe from the given template.
 * @param fn A callback function with parameters to define the recipe.
 * @returns A module result.
 */
export function defineRecipe(fn: (template: RecipeTemplate) => void): Recipe {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as RecipeTemplate)

		return transformTemplate(template, '1.12.0')
	}, 'Failed to transform recipe')
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		shaped: (_template) => {
			template.recipe = {
				shaped: {
					...template.recipe?.shaped,
					..._template
				}
			}
		},
		shapeless: (_template) => {
			template.recipe = {
				shapeless: {
					...template.recipe?.shapeless,
					..._template
				}
			}
		},
		furnace: (_template) => {
			template.recipe = {
				furnace: {
					...template.recipe?.furnace,
					..._template
				}
			}
		},
		brewingContainer: (_template) => {
			template.recipe = {
				brewing_container: {
					...template.recipe?.brewing_container,
					..._template
				}
			}
		},
		brewingMix: (_template) => {
			template.recipe = {
				brewing_mix: {
					...template.recipe?.brewing_mix,
					..._template
				}
			}
		},
		materialReduction: (_template) => {
			template.recipe = {
				material_reduction: {
					...template.recipe?.material_reduction,
					..._template
				}
			}
		},
		use: (...components) => {
			deepMerge(template, ...components)
		}
	}
}

function transformTemplate(template: VanillaTemplate, version: string): Recipe {
	const transformedTemplate = objectMap(
		template.recipe as Required<VanillaTemplate>,
		(key, value) => {
			return [`minecraft:recipe_${key}`, value]
		}
	)

	return {
		format_version: version,
		...transformedTemplate
	}
}
