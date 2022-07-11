import { blue } from 'colorette'
import { importModule } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'build',
		usage: 'npx sedge build [--target=<name>]',
		description: 'Builds the project for production'
	},
	run: async (args) => {
		try {
			const { createAtropa } = await importModule('atropa/compiler')
			await createAtropa({
				target: args.target,
				mode: 'build'
			})
		} catch (error) {
			throw new Error(
				`This command requires the ${blue(
					'atropa'
				)} package to be installed in your project`,
				{ cause: error as Error }
			)
		}
	}
})
