import { blue } from 'colorette'
import { importAtropa, tryCatch } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'build',
		usage: 'npx sedge build [--target=<name>]',
		description: 'Compiles the project'
	},
	run: async (args) => {
		await tryCatch(async () => {
			const { createAtropa } = await importAtropa('compiler')
			await createAtropa({
				target: args.target,
				mode: 'build'
			})
		}, `This command requires the ${blue('atropa')} package to be installed in your project`)
	}
})
