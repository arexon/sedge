import { defineComponent } from 'volars'

export const attributes = defineComponent(
	'block@1.19.10',
	(
		{ name, withLoot }: { name: string; withLoot?: boolean },
		{ namespace, description, components, lootTable }
	) => {
		description({
			identifier: `${namespace}:${name}`
		})

		components({
			display_name: `${namespace}:${name}`
		})

		if (withLoot) {
			components({
				loot: `loot_tables/block/${name}.loot.json`
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
				`loot_tables/block/${name}.loot.json`
			)
		}
	}
)
