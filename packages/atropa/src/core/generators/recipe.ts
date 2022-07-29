import { deepMerge } from '@antfu/utils'
import type {
	RecipeKey,
	RecipePattern,
	RecipeResult as _RecipeResult,
	RecipeTagTypes
} from '../../schema/recipe'
import { tryCatch } from '../utils'
import type { Description, Namespace, UseFunction } from './types'

interface RecipeDescriptionFunction {
	/**
	 * # Description
	 * Describes the recipe.
	 * @param description The recipe description.
	 */
	description(template: Description): void
}
interface RecipeTagsFunction {
	/**
	 * # Tags
	 * Item(s) that can create the recipe.
	 * @param template The recipe tags.
	 */
	tags(template: RecipeTagTypes): void
}
interface RecipeGroupFunction {
	/**
	 * # Group
	 * The group of the recipe.
	 * @param template The recipe group.
	 */
	group(template: string): void
}
interface RecipePriorityFunction {
	/**
	 * # Priority
	 * Sets the priority order of the recipe. Lower numbers represent a higher priority.
	 * @param template The recipe priority.
	 */
	priority(template: number): void
}
interface RecipeResultFunction {
	/**
	 * # Result
	 * The result of the recipe.
	 * @param template The recipe result.
	 */
	result(template: _RecipeResult): void
}
interface RecipePatternFunction {
	/**
	 * # Pattern
	 * Characters that represent a pattern to be defined by keys.
	 * @param template The recipe pattern.
	 */
	pattern(template: RecipePattern): void
}
interface RecipeKeyFunction {
	/**
	 * # Key
	 * Keys to map characters to item names to be used in `pattern`.
	 * @param template The recipe key.
	 */
	key(template: RecipeKey): void
}
interface RecipeIngredientsFunction {
	/**
	 * # Ingredient
	 * Items used as input (without a shape) for the recipe.
	 * @param template The recipe ingredients.
	 */
	ingredients(template: _RecipeResult[]): void
}
interface RecipeInputFunction {
	/**
	 * # Input
	 * Items used as input for the furnace recipe.
	 * @param template The recipe input.
	 */
	input(template: string): void
}
interface RecipeOutputFunction {
	/**
	 * # Output
	 * Items used as output for the furnace recipe.
	 * @param template The recipe output.
	 */
	output(template: string): void
}
interface RecipeReagentFunction {
	/**
	 * # Reagent
	 * Item used in the brewing container recipe with the input potion.
	 * @param template The recipe reagent.
	 */
	reagent(template: string): void
}

interface RecipeShapedTemplate
	extends RecipeDescriptionFunction,
		RecipeTagsFunction,
		RecipeGroupFunction,
		RecipePriorityFunction,
		RecipeResultFunction,
		RecipePatternFunction,
		RecipeKeyFunction {}
interface RecipeShapelessTemplate
	extends RecipeDescriptionFunction,
		RecipeTagsFunction,
		RecipeGroupFunction,
		RecipePriorityFunction,
		RecipeResultFunction,
		RecipeIngredientsFunction {}
interface RecipeFurnaceTemplate
	extends RecipeDescriptionFunction,
		RecipeTagsFunction,
		RecipeGroupFunction,
		RecipeInputFunction,
		RecipeOutputFunction {}
interface RecipeBrewingMixTemplate
	extends RecipeDescriptionFunction,
		RecipeTagsFunction,
		RecipeInputFunction,
		RecipeOutputFunction,
		RecipeReagentFunction {}
interface RecipeBrewingContainerTemplate
	extends RecipeDescriptionFunction,
		RecipeTagsFunction,
		RecipeInputFunction,
		RecipeOutputFunction,
		RecipeReagentFunction {}
interface RecipeMaterialReductionTemplate
	extends RecipeDescriptionFunction,
		RecipeTagsFunction,
		RecipeInputFunction,
		RecipeOutputFunction {}

export type RecipeTypes =
	| 'shaped'
	| 'shapeless'
	| 'furnace'
	| 'brewing_mix'
	| 'brewing_container'
	| 'material_reduction'
export type RecipeTemplate<Type extends RecipeTypes> = (Type extends 'shaped'
	? RecipeShapedTemplate
	: Type extends 'shapeless'
	? RecipeShapelessTemplate
	: Type extends 'furnace'
	? RecipeFurnaceTemplate
	: Type extends 'brewing_mix'
	? RecipeBrewingMixTemplate
	: Type extends 'brewing_container'
	? RecipeBrewingContainerTemplate
	: Type extends 'material_reduction'
	? RecipeMaterialReductionTemplate
	: never) &
	Namespace &
	UseFunction

type UserTemplate = Partial<
	RecipeDescriptionFunction &
		RecipeTagsFunction &
		RecipeGroupFunction &
		RecipePriorityFunction &
		RecipeResultFunction &
		RecipePatternFunction &
		RecipeKeyFunction &
		RecipeIngredientsFunction &
		Namespace &
		UseFunction
>
interface VanillaTemplate {
	description?: Record<string, any>
	tags?: string[]
	group?: string
	pattern?: string[]
	priority?: number
	key?: Record<string, any>
	result?: Record<string, any>
	ingredients?: Record<string, any>[]
}

type Recipe = {
	[key in `minecraft:recipe_${RecipeTypes}`]?: VanillaTemplate
} & {
	format_version: string
}
interface RecipeResult {
	type: 'json'
	data: Recipe
}

/**
 * # Define Recipe
 * Generates a recipe from the given template.
 * @param type The type of recipe to generate.
 * @param fn A function that defines the recipe.
 * @returns A module result that contains the recipe.
 */
export function defineRecipe<Type extends RecipeTypes>(
	type: Type,
	fn: (template: RecipeTemplate<Type>) => void
): RecipeResult {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as RecipeTemplate<Type>)

		return {
			type: 'json',
			data: transformTemplate(template, type)
		}
	}, 'Failed to transform recipe')
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		description: (_template) => {
			template.description = { ...template.description, ..._template }
		},
		tags: (_template) => {
			template.tags = [...(template.tags || []), _template]
		},
		group: (_template) => {
			template.group = _template
		},
		pattern: (_template) => {
			template.pattern = [...(template.pattern || []), ..._template]
		},
		priority: (_template) => {
			template.priority = _template
		},
		key: (_template) => {
			template.key = { ...template.key, ..._template }
		},
		result: (_template) => {
			template.result = { ...template.result, ..._template }
		},
		ingredients: (_template) => {
			template.ingredients = [
				...(template.ingredients || []),
				..._template
			]
		},
		use: (...components) => {
			deepMerge(template, ...components)
		}
	}
}

function transformTemplate(template: VanillaTemplate, type: string): Recipe {
	return {
		format_version: '1.12.0',
		[`minecraft:recipe_${type}`]: template
	}
}
