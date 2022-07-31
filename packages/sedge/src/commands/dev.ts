import { blue } from 'colorette'
import { tryCatch } from '../utils'
import { importAtropa } from '../utils/module'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'dev',
		usage: 'npx sedge dev [--target=<name>] [--websocket]',
		description: 'Runs the project in watch mode'
	},
	run: async (args) => {
		await tryCatch(async () => {
			const { createAtropa } = await importAtropa('compiler')
			const withWebSocket = args.websocket

			await createAtropa({
				target: args.target,
				mode: withWebSocket ? 'dev+websocket' : 'dev'
			})
		}, `This command requires the ${blue('atropa')} package to be installed in your project`)
	}
})
