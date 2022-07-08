import { defineBlock } from 'volars/server'
import { attributes } from '#components/attributes'

export default defineBlock(
	'1.19.10',
	({ components }) => {
		components({
			unit_cube: {}
		})
	},
	[attributes({ name: 'table', withLoot: true, withRecipe: true })]
)
