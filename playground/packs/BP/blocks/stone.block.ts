import { defineBlock } from 'volars'

export default defineBlock(
	'1.19.10',
	({ namespace, description, permutations, components }) => {
		description({
			identifier: `${namespace}:stone`
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
			map_color: '#123456',
			on_interact: {
				condition: 'q.is_sneaking',
				event: `${namespace}:some_event`
			}
		})
	}
)
