import { defineBlock } from 'volars'

export default defineBlock(
	'1.19.10',
	({ namespace, description, components }) => {
		description({
			identifier: `${namespace}:stone`
		})

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
