import type { RecipeTemplate } from './template'

/**
 * # Define Recipe
 *
 * Generates a recipe from the given template.
 * @param fn A callback function with function parameters used to define the recipe.
 * @returns An object representation of the recipe.
 */
declare function defineRecipe(
	fn: (template: RecipeTemplate) => void
): Record<string, any>

export { defineRecipe }
