import { defineBlock } from 'atropa/server'
import Attributes from '../components/Attributes'

export default defineBlock(
	'1.19.10',
	({ namespace, description, components, permutations, events, use }) => {
		const isOn = `${namespace}:is_on`
		const toggle = `${namespace}:toggle`
		const modes = ['off', 'on']

		use(Attributes({ name: 'radio' }))
		description({
			properties: { [isOn]: [false, true] }
		})

		modes.map((mode) => {
			permutations([
				{
					condition: `q.block_property('${isOn}') == ${
						mode === 'on' ? true : false
					}`,
					components: { geometry: `geometry.radio.${mode}` }
				}
			])
		})

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
	}
)
