import { defineRecipe } from 'volars/server'

export default defineRecipe(({ namespace, shaped }) => {
	shaped({
		description: {
			identifier: `${namespace}:recipe.radio`
		},
		tags: ['crafting_table'],
		pattern: ['A', 'B'],
		key: {
			A: { item: 'minecraft:planks' },
			B: { item: 'minecraft:note' }
		},
		result: { item: `${namespace}:radio` }
	})
})
