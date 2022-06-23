import { defineBlock } from 'volars'

export default defineBlock(
	'1.19.10',
	({ namespace, description, permutations, components, events }) => {
		const isRotated = `${namespace}:is_rotated`
		const rotateBy90 = `${namespace}:rotate_by_90`

		description({
			identifier: `${namespace}:stone`,
			properties: {
				[isRotated]: [false, true]
			}
		})

		permutations([
			{
				condition: '(1.0)',
				components: {
					rotation: [0, 90, 0]
				}
			}
		])

		components({
			unit_cube: {},
			on_interact: {
				condition: 'q.is_sneaking',
				event: rotateBy90
			}
		})

		events({
			[rotateBy90]: {
				set_block_property: {
					[isRotated]: true
				}
			}
		})
	}
)
