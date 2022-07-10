import mri from 'mri'
import { blue } from 'colorette'
import { commands, type CommandName } from './commands'
import { logger, showBanner, showHelp } from './utils'

export default async function (): Promise<void> {
	try {
		const args = mri(process.argv.slice(2), {
			default: {
				target: 'default'
			},
			alias: {
				t: 'target',
				h: 'help'
			},
			string: ['target'],
			boolean: ['help']
		})

		const commandName = args._[0]

		if (!(commandName in commands)) {
			throw new Error(`Unknown command: ${blue(commandName)}`)
		}

		showBanner()

		const command = await commands[commandName as CommandName]()
		if (args.help) {
			showHelp(command.meta)
		} else {
			await command.run(args)
		}
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}
}
