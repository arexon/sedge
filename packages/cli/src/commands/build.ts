import { requiredPackageError } from '../constants'
import { importSedge, tryCatch } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		usage: 'npx sedge build [--target|--t]',
		description: 'Compile the project in production mode'
	},
	run: async (args) => {
		await tryCatch(async () => {
			const { createSedge } = await importSedge('compiler')
			await createSedge({
				target: args.target,
				mode: 'build'
			})
		}, requiredPackageError)
	}
})
