import { blue } from 'colorette'
import { importModule } from '../utils/module'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'dev',
		usage: 'npx sedge dev [--target=<name>]',
		description: 'Runs the project in watch mode'
	},
	run: async (args) => {
		try {
			const { createAtropa } = await importModule('atropa/compiler')
			await createAtropa({
				target: args.target,
				dev: true
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