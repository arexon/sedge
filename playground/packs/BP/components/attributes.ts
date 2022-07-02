import { defineComponent } from 'volars'

export const attributes = defineComponent(
	'block@1.19.10',
	({ name }: { name: string }, { namespace, description, components }) => {
		description({
			identifier: `${namespace}:${name}`
		})

		components({
			display_name: `${namespace}:${name}`,
			loot: `loot_tables/block/${name}.loot.json`
		})
	}
)
