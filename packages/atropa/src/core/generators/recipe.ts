import { objectMap } from '@antfu/utils'
import type { RecipeTemplate } from '../../schema/atropa/recipe'

interface UserTemplate {
	namespace: string
	shaped: (template: Record<string, any>) => void
	shapeless: (template: Record<string, any>) => void
	furnace: (template: Record<string, any>) => void
	brewingContainer: (template: Record<string, any>) => void
	brewingMix: (template: Record<string, any>) => void
	materialReduction: (template: Record<string, any>) => void
}
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
 *
 * Generates a recipe from the given template.
 * @param fn A callback function with function parameters used to define the recipe.
 * @returns A recipe.
 */
export function defineRecipe(
	fn: (template: RecipeTemplate) => void
): Record<string, any> {
	try {
		const template = {}

		fn(processTemplate(template))
		return transformTemplate(template, '1.12.0')
	} catch (error) {
		throw new Error(`Failed to transform recipe:`, error as Error)
	}
}

function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		shaped: (_template) => {
			template.recipe = { shaped: _template }
		},
		shapeless: (_template) => {
			template.recipe = { shapeless: _template }
		},
		furnace: (_template) => {
			template.recipe = { furnace: _template }
		},
		brewingContainer: (_template) => {
			template.recipe = { brewing_container: _template }
		},
		brewingMix: (_template) => {
			template.recipe = { brewing_mix: _template }
		},
		materialReduction: (_template) => {
			template.recipe = { material_reduction: _template }
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
