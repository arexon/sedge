import { assertEquals } from 'testing/asserts.ts';
import { defineRecipe } from './recipe.ts';

Deno.test('defineRecipe', async ({ step }) => {
	const description = {
		description: {
			identifier: '__SEDGE_NAMESPACE__:foo_recipe',
		},
	};

	await step('should return a shaped recipe', () => {
		assertEquals(
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
				extension: '.json',
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

	await step('should return a shapeless recipe', () => {
		assertEquals(
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
				extension: '.json',
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

	await step('should return a furnace recipe', () => {
		assertEquals(
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
				extension: '.json',
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

	await step('brewing', async ({ step }) => {
		const brewingTemplate: any = {
			tags: ['brewing_stand'],
			input: 'minecraft:potion',
			output: 'minecraft:splash_potion',
			reagent: 'minecraft:gunpowder',
		};

		await step('should return a brewing container recipe', () => {
			assertEquals(
				defineRecipe(({ namespace, brewing }) => {
					brewing('container', {
						description: {
							identifier: `${namespace}:foo_recipe`,
						},
						...brewingTemplate,
					});
				}),
				{
					extension: '.json',
					data: {
						format_version: '1.12.0',
						'minecraft:recipe_brewing_container': {
							...description,
							...brewingTemplate,
						},
					},
				},
			);
		});

		await step('should return a brewing mix recipe', () => {
			assertEquals(
				defineRecipe(({ namespace, brewing }) => {
					brewing('mix', {
						description: {
							identifier: `${namespace}:foo_recipe`,
						},
						...brewingTemplate,
					});
				}),
				{
					extension: '.json',
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
	});
});
