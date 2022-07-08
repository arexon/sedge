import { defineBlock } from 'volars/server'
import { attributes } from '#components/attributes'

export default defineBlock(
	'1.19.10',
	({ namespace, description, components, permutations, events }) => {
		const isOn = `${namespace}:is_on`
		const toggle = `${namespace}:toggle`

		description({
			properties: { [isOn]: [false, true] }
		})

		permutations([
			{
				condition: `q.block_property('${isOn}') == false`,
				components: { geometry: 'geometry.radio.off' }
			},
			{
				condition: `q.block_property('${isOn}') == true`,
				components: { geometry: 'geometry.radio.on' }
			}
		])

		components({
			on_interact: {
				condition: 'q.is_sneaking',
				event: toggle
			}
		})

		events({
			[toggle]: {
				set_block_property: {
					[isOn]: `!q.block_property('${isOn}')`
				}
			}
		})
	},
	[attributes({ name: 'radio', withLoot: false })]
)
