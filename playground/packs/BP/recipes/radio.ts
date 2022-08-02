import { defineRecipe } from 'sedge/core'

export default defineRecipe(
	'shaped',
	({ namespace, description, tags, pattern, key, result }) => {
		description({
			identifier: `${namespace}:recipe.radio`
		})
		tags('crafting_table')
		pattern(['###', '# #', '# #'])
		key({
			'#': {
				item: 'minecraft:planks'
			}
		})
		result({
			item: `${namespace}:radio`
		})
	}
)
