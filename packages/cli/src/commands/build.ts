import { blue } from 'colorette'
import { importSedge, tryCatch } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'build',
		usage: 'npx sedge build [--target=<name>]',
		description: 'Compiles the project'
	},
	run: async (args) => {
		await tryCatch(async () => {
			const { createSedge } = await importSedge('compiler')
			await createSedge({
				target: args.target,
				mode: 'build'
			})
		}, `This command requires the ${blue('sedge')} package to be installed in your project`)
	}
})
