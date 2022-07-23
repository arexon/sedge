import {
	processTemplate,
	transformTemplate
} from '../compiler/transformers/recipe'
import type { RecipeTemplate } from '../schema/atropa/server/recipe'

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
