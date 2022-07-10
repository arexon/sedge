import { blue } from 'colorette'
import { logHelp } from '../utils'
import { commands, defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'help',
		usage: 'npx sedge help',
		description: 'Shows help'
	},
	run: () => {
		const sections: string[] = []

		sections.push(
			`Usage: ${blue(
				`npx sedge ${Object.keys(commands).join('|')} [args]`
			)}`
		)

		logHelp()
	}
})
