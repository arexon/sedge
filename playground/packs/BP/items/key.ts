import { defineItem } from 'atropa/server'

export default defineItem(
	'1.19.0',
	({ namespace, description, components, events }) => {
		const sayHiEvent = `${namespace}:say_hi`

		description({
			identifier: `${namespace}:key`
		})

		components({
			display_name: { value: 'key' },
			allow_off_hand: true,
			on_use_on: { event: sayHiEvent }
		})

		events({
			[sayHiEvent]: {
				run_command: {
					command: 'say hi',
					target: 'player'
				}
			}
		})
	}
)
