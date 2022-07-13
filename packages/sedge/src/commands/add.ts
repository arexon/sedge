import fse from 'fs-extra'
import prompts from 'prompts'
import { join } from 'pathe'
import { blackBright, blue } from 'colorette'
import {
	getServerBlock,
	getComponent,
	getLootTable,
	getRecipe,
	importAtropa,
	logger
} from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'add',
		usage: 'npx sedge add',
		description: 'Adds a module template to your project'
	},
	run: async () => {
		const { loadConfig } = await importAtropa('loader')
		const config = await loadConfig()

		const { module, identifier } = await prompts([
			{
				name: 'module',
				type: 'select',
				message: 'What kind of module do you want to add?',
				choices: [
					{
						title: 'Custom Component',
						value: { type: 'components', pack: 'server' }
					},
					{
						title: 'Server Block',
						value: { type: 'blocks', pack: 'server' }
					},
					{
						title: 'Recipe',
						value: { type: 'recipes', pack: 'server' }
					},
					{
						title: 'Loot Table',
						value: { type: 'loot_tables', pack: 'server' }
					}
				]
			},
			{
				name: 'identifier',
				type: 'text',
				message: 'What is the identifier of your module?'
			}
		])
		const { path } = await prompts({
			name: 'path',
			type: 'text',
			message: 'Where do you want to add your module?',
			initial: join(
				module.pack === 'server'
					? config.packs.behaviorPack
					: config.packs.resourcePack,
				module.type,
				`${identifier}.ts`
			)
		})

		const checkIfAlreadyExists = (type: string): void => {
			if (fse.existsSync(path)) {
				logger.error(`${type} at ${blackBright(path)} already exists`)
				process.exit(1)
			}
		}
		const logSuccess = (type: string): void => {
			logger.success(
				`Added ${type} ${blue(identifier)} at ${blackBright(path)}`
			)
		}

		if (module.pack === 'server') {
			switch (module.type) {
				case 'components':
					checkIfAlreadyExists('Component')
					fse.outputFileSync(path, getComponent(identifier))
					logSuccess('component')
					break
				case 'blocks':
					checkIfAlreadyExists('Block')
					fse.outputFileSync(path, getServerBlock(identifier))
					logSuccess('block')
					break
				case 'loot_tables':
					checkIfAlreadyExists('Loot Table')
					fse.outputFileSync(path, getLootTable(identifier))
					logSuccess('loot table')
					break
				case 'recipes':
					checkIfAlreadyExists('Recipe')
					fse.outputFileSync(path, getRecipe(identifier))
					logSuccess('recipe')
			}
		}
	}
})
