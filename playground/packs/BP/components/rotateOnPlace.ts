import { defineComponent } from 'volars'

export const rotateOnPlace = defineComponent(
	'block@1.19.10',
	({}, { namespace, description, components, permutations, events }) => {
		const facingProperty = `${namespace}:rotation`
		const setFacingEvent = `${namespace}:set_rotation`
		const directions = [0, 90, 180, 270]

		description({
			properties: {
				[facingProperty]: [0, 1, 2, 3]
			}
		})

		permutations(
			directions.map((direction, index) => ({
				condition: `q.block_property('${facingProperty}') == ${index}`,
				components: {
					rotation: [0, direction, 0]
				}
			}))
		)

		components({
			on_player_placing: {
				event: setFacingEvent
			}
		})

		events({
			[setFacingEvent]: {
				set_block_property: {
					[facingProperty]: 'q.cardinal_facing_2d - 2'
				}
			}
		})
	}
)
