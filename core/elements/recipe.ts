import { SEDGE_NAMESPACE } from '../../shared/mod.ts';
import { Namespace } from '../types.ts';
import { createGameElement, GameElementResult } from './game_element.ts';

interface RecipeItemData {
	/** Provides the identifier of the item. */
	item: string;

	/** Sets the result item's data value. */
	data?: number;

	/**
	 * Sets how many of the result item should be crafted.
	 * @default 1
	 */
	count?: number;
}
interface RecipeDescription {
	/** Required recipe information */
	description: {
		/** The identifier of the recipe. */
		identifier: string;
	};
}
interface RecipeTags {
	/** Blocks that can create this recipe. */
	tags: (
		| 'brewing_stand'
		| 'crafting_table'
		| 'furnace'
		| 'smoker'
		| 'campfire'
		| 'soul_campfire'
	)[];
}
interface RecipeResult {
	/** The result of the recipe. */
	result: RecipeItemData;
}

interface RecipeFurnace extends RecipeDescription, RecipeTags {
	/** Items used as input for the furnace recipe. */
	input: RecipeItemData | string;

	/** Items used as output for the furnace recipe. */
	output: RecipeItemData | string;
}
interface RecipeBrewingContainer extends RecipeDescription, RecipeTags {
	/** Input potion used in the brewing container recipe. */
	input: RecipeItemData | string;

	/** Output potion from the brewing container recipe. */
	output: RecipeItemData | string;

	/** Item used in the brewing container recipe with the input potion. */
	reagent: RecipeItemData | string;
}
interface RecipeBrewingMix extends RecipeDescription, RecipeTags {
	/** Input potion used on the brewing stand. */
	input: RecipeItemData | string;

	/** Output potion from mixing the input potion with the reagent on the brewing stand. */
	output: RecipeItemData | string;

	/** item used to mix with the input potion. */
	reagent: RecipeItemData | string;
}
interface RecipeShaped extends RecipeDescription, RecipeTags, RecipeResult {
	/** Characters that represent a pattern to be defined by keys. */
	pattern: [string, string, string] | [string, string] | [string];

	/** Keys to map characters to item names to be used in `pattern`. */
	key: { [key: string]: Omit<RecipeItemData, 'count'> };

	/**
	 * Sets the priority order of the recipe. Lower numbers represent a higher priority.
	 * @default 0
	 */
	priority?: number;
}
interface RecipeShapeless extends RecipeDescription, RecipeTags, RecipeResult {
	/** items used as input (without a shape) for the recipe. */
	ingredients: RecipeItemData | RecipeItemData[] | string[];
}

interface RecipeTemplate extends Namespace {
	/** A potion brewing recipe. */
	brewing<Type extends 'mix' | 'container'>(
		type: Type,
		recipe: Type extends 'mix' ? RecipeBrewingMix
			: RecipeBrewingContainer,
	): void;

	/** Represents a shaped crafting recipe for a crafting table. */
	shaped(recipe: RecipeShaped): void;

	/** Represents a shapeless crafting recipe. */
	shapeless(recipe: RecipeShapeless): void;

	/** Represents a furnace recipe for a furnace. */
	furnace(recipe: RecipeFurnace): void;
}

interface RecipeData {
	format_version: string;
	'minecraft:recipe_furnace'?: RecipeFurnace;
	'minecraft:recipe_brewing_container'?: RecipeBrewingContainer;
	'minecraft:recipe_brewing_mix'?: RecipeBrewingMix;
	'minecraft:recipe_shaped'?: RecipeShaped;
	'minecraft:recipe_shapeless'?: RecipeShapeless;
}

/**
 * Define a recipe with the provided template.
 *
 * @example
 * ```ts
 * export default defineRecipe(({ namespace, shaped }) => {
 *   shaped({
 *     description: {
 *       identifier: `${namespace}:foo_recipe`,
 *     },
 *     tags: ['crafting_table'],
 *     pattern: ['###', '# #', '###'],
 *     key: {
 *       '#': { item: 'minecraft:stick' },
 *     },
 *     result: { item: `${namespace}:foo` },
 *   });
 * });
 * ```
 */
export const defineRecipe = createGameElement<
	RecipeTemplate,
	RecipeData,
	GameElementResult<RecipeData>
>({
	process: (data) => ({
		namespace: SEDGE_NAMESPACE,
		furnace: (recipe) => data['minecraft:recipe_furnace'] = recipe,
		brewing: (type, recipe) => {
			if (type === 'mix') data['minecraft:recipe_brewing_mix'] = recipe;
			else data['minecraft:recipe_brewing_container'] = recipe;
		},
		shaped: (recipe) => data['minecraft:recipe_shaped'] = recipe,
		shapeless: (recipe) => data['minecraft:recipe_shapeless'] = recipe,
	}),
	transform: (data) => ({
		extension: '.json',
		data: { ...{ format_version: '1.12.0' }, ...data },
	}),
});
