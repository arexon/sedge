import { deepMerge, objectMap } from '@antfu/utils'
import type { RecipeTemplate } from '../../schema/atropa/recipe'
import { tryCatch } from '../utils'

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
