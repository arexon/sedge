import { blue } from 'colorette'
import { logger, logHelp } from '../utils'
import { commands, defineCommand } from './index'

export default defineCommand({
	meta: {
		usage: 'npx sedge help',
		description: 'Show all available commands'
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
