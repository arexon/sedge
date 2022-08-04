import { blue } from 'colorette'
import mri from 'mri'
import { commands, type CommandName } from './commands'
import { logBanner, logger, logHelp } from './utils'

export default async function (): Promise<void> {
	try {
		const args = mri(process.argv.slice(2), {
			default: {
				target: 'default',
				websocket: false,
				template: 'sedge-core/starter'
			},
			alias: {
				m: 'module',
				t: 'target',
				h: 'help',
				w: 'world',
				ws: 'websocket',
				tp: 'template'
			},
			string: ['target', 'module', 'world', 'template'],
			boolean: ['help', 'websocket']
		})

		const commandName = args._[0]

		if (commandName === undefined) {
			const help = await commands['help']()
			return help.run(args)
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
