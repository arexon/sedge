import { defineRecipe } from 'atropa/core'

export default defineRecipe(({ namespace, shaped }) => {
	shaped({
		description: {
			identifier: `${namespace}:recipe.radio`
		},
		tags: ['crafting_table'],
		pattern: ['###', '# #', '# #'],
		key: {
			'#': { item: 'minecraft:planks' }
		},
		result: { item: `${namespace}:radio` }
	})
})
