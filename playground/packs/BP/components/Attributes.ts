import { defineComponent } from 'atropa/core'

export default defineComponent(
	'block@1.19.10',
	({ name }: { name: string }, { namespace, description, components }) => {
		description({
			identifier: `${namespace}:${name}`
		})

		components({
			display_name: `${namespace}:${name}`,
			loot: `loot_tables/${name}.loot.json`
		})
	}
)
