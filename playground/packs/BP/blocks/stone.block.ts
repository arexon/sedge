import { defineBlock } from 'volars'
import { rotateOnPlace } from '../components/rotateOnPlace'

export default defineBlock(
	'1.19.10',
	({ namespace, description, components }) => {
		description({
			identifier: `${namespace}:stone`
		})

		components({
			unit_cube: {}
		})
	},
	[rotateOnPlace()]
)
