import { blue } from 'colorette'
import { logger, logHelp } from '../utils'
import { commands, defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'help',
		usage: 'npx sedge help',
		description: 'Shows help'
	},
	run: () => {
		logger.info(
			`Usage: ${blue(
				`npx sedge ${Object.keys(commands).join('|')} [args]`
			)}\n`
		)

		logHelp()
	}
})
