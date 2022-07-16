import { logger } from '../../logger'
import type { RecipeTemplate } from '../../schema/atropa/server/recipe'

interface VanillaTemplate {
	recipe?: Record<string, any>
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
		const template: VanillaTemplate = {}

		fn(processTemplate(template))

		return { format_version: '1.12.0', ...template.recipe }
	} catch (error) {
		logger.error(`Failed to parse recipe:`, error)
		process.exit(1)
	}
}

function processTemplate(fields: VanillaTemplate): RecipeTemplate {
	const getObject = (name: string, template: Record<string, any>) => {
		return { [`minecraft:recipe_${name}`]: template }
	}
	return {
		namespace: global.config.namespace,
		shaped: (template) => {
			fields.recipe = getObject('shaped', template)
		},
		shapeless: (template) => {
			fields.recipe = getObject('shapeless', template)
		},
		furnace: (template) => {
			fields.recipe = getObject('furnace', template)
		},
		brewingContainer: (template) => {
			fields.recipe = getObject('brewing_container', template)
		},
		brewingMix: (template) => {
			fields.recipe = getObject('brewing_mix', template)
		},
		materialReduction: (template) => {
			fields.recipe = getObject('material_reduction', template)
		}
	}
}
