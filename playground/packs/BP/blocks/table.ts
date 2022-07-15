import { defineBlock } from 'atropa/server'
import Attributes from '../components/Attributes'

export default defineBlock(
	'1.19.10',
	({ components }) => {
		components({
			unit_cube: {}
		})
	},
	[Attributes({ name: 'table', withLoot: true, withRecipe: true })]
)
