import { defineComponent } from 'volars/server'

export const attributes = defineComponent(
	'block@1.19.10',
	(
		{
			name,
			withLoot,
			withRecipe
		}: { name: string; withLoot?: boolean; withRecipe?: boolean },
		{ namespace, description, components, lootTable, recipe }
	) => {
		description({
			identifier: `${namespace}:${name}`
		})

		components({
			display_name: `${namespace}:${name}`
		})

		if (withLoot) {
			components({
				loot: `loot_tables/${name}.loot.json`
			})

			lootTable(
				{
					pools: [
						{
							rolls: 1,
							entries: {
								type: 'item',
								name: `${namespace}:${name}`,
								weight: 1
							}
						}
					]
				},
				`loot_tables/${name}.loot.json`
			)
		}

		if (withRecipe) {
			recipe(
				{
					recipe_shaped: {
						description: {
							identifier: `${namespace}:recipe.${name}`
						},
						tags: ['crafting_table'],
						pattern: ['###', '# #', '# #'],
						key: {
							'#': { item: 'minecraft:planks' }
						},
						result: { item: `${namespace}:${name}` }
					}
				},
				`recipes/${name}.recipe.json`
			)
		}
	}
)
