import { assertObjectMatch } from 'testing/asserts.ts';
import { defineRecipe } from './recipe.ts';

const description = {
	description: {
		identifier: '__SEDGE_NAMESPACE__:foo_recipe',
	},
};

Deno.test('defineRecipe: shaped', () => {
	assertObjectMatch(
		defineRecipe(({ namespace, shaped }) => {
			shaped({
				description: {
					identifier: `${namespace}:foo_recipe`,
				},
				tags: ['crafting_table'],
				pattern: ['###', '# #', '###'],
				key: {
					'#': { item: 'minecraft:stick' },
				},
				result: { item: `${namespace}:foo` },
			});
		}),
		{
			type: 'gameElement',
			data: {
				format_version: '1.12.0',
				'minecraft:recipe_shaped': {
					...description,
					tags: ['crafting_table'],
					pattern: ['###', '# #', '###'],
					key: {
						'#': { item: 'minecraft:stick' },
					},
					result: { item: '__SEDGE_NAMESPACE__:foo' },
				},
			},
		},
	);
});

Deno.test('defineRecipe: shapeless', () => {
	assertObjectMatch(
		defineRecipe(({ namespace, shapeless }) => {
			shapeless({
				description: {
					identifier: `${namespace}:foo_recipe`,
				},
				tags: ['crafting_table'],
				ingredients: [
					{ item: 'minecraft:stick' },
					{ item: 'minecraft:iron_ingot' },
				],
				result: { item: `${namespace}:foo` },
			});
		}),
		{
			type: 'gameElement',
			data: {
				format_version: '1.12.0',
				'minecraft:recipe_shapeless': {
					...description,
					tags: ['crafting_table'],
					ingredients: [
						{ item: 'minecraft:stick' },
						{ item: 'minecraft:iron_ingot' },
					],
					result: { item: '__SEDGE_NAMESPACE__:foo' },
				},
			},
		},
	);
});

Deno.test('defineRecipe: furnace', () => {
	assertObjectMatch(
		defineRecipe(({ namespace, furnace }) => {
			furnace({
				description: {
					identifier: `${namespace}:foo_recipe`,
				},
				tags: ['furnace'],
				input: { item: 'minecraft:iron_ingot' },
				output: { item: `${namespace}:foo` },
			});
		}),
		{
			type: 'gameElement',
			data: {
				format_version: '1.12.0',
				'minecraft:recipe_furnace': {
					...description,
					tags: ['furnace'],
					input: { item: 'minecraft:iron_ingot' },
					output: { item: '__SEDGE_NAMESPACE__:foo' },
				},
			},
		},
	);
});

Deno.test('defineRecipe: brewing', () => {
	const brewingTemplate: any = {
		tags: ['brewing_stand'],
		input: 'minecraft:potion',
		output: 'minecraft:splash_potion',
		reagent: 'minecraft:gunpowder',
	};

	const brewingContainer = defineRecipe(({ namespace, brewing }) => {
		brewing('container', {
			description: {
				identifier: `${namespace}:foo_recipe`,
			},
			...brewingTemplate,
		});
	});
	const brewingMix = defineRecipe(({ namespace, brewing }) => {
		brewing('mix', {
			description: {
				identifier: `${namespace}:foo_recipe`,
			},
			...brewingTemplate,
		});
	});

	assertObjectMatch(
		brewingContainer,
		{
			type: 'gameElement',
			data: {
				format_version: '1.12.0',
				'minecraft:recipe_brewing_container': {
					...description,
					...brewingTemplate,
				},
			},
		},
	);
	assertObjectMatch(
		brewingMix,
		{
			type: 'gameElement',
			data: {
				format_version: '1.12.0',
				'minecraft:recipe_brewing_mix': {
					...description,
					...brewingTemplate,
				},
			},
		},
	);
});
