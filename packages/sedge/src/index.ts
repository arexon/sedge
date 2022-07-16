import mri from 'mri'
import { blue } from 'colorette'
import { commands, type CommandName } from './commands'
import { logger, logBanner, logHelp } from './utils'

export default async function (): Promise<void> {
	try {
		const args = mri(process.argv.slice(2), {
			default: {
				target: 'default'
			},
			alias: {
				m: 'module',
				t: 'target',
				h: 'help'
			},
			string: ['target', 'module'],
			boolean: ['help']
		})

		const commandName = args._[0]

		if (commandName === undefined) {
			return logHelp()
		} else if (!(commandName in commands)) {
			throw new Error(`Unknown command: ${blue(commandName)}`)
		}

		logBanner()
		const command = await commands[commandName as CommandName]()
		if (args.help) return logHelp(command.meta)
		await command.run(args)
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}
}
