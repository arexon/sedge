import { requiredPackageError } from '../constants'
import { tryCatch } from '../utils'
import { importSedge } from '../utils/import'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		usage: 'npx sedge dev [--target|--t] [--websocket|--ws]',
		description:
			'Compiles the project in development mode and watch for changes'
	},
	run: async (args) => {
		await tryCatch(async () => {
			const { createSedge } = await importSedge('compiler')

			await createSedge({
				target: args.target,
				mode: args.websocket ? 'dev+websocket' : 'dev'
			})
		}, requiredPackageError)
	}
})
