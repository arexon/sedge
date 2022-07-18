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
	getCollection,
	logger,
	type Config
} from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'add',
		usage: 'npx sedge add',
		description: 'Adds a module template to your project'
	},
	run: async () => {
		interface Module {
			type:
				| 'components'
				| 'collections'
				| 'blocks'
				| 'recipes'
				| 'loot_tables'
			pack: 'server' | 'client'
		}

		const { loadConfig } = await importAtropa('loader')
		const config = await loadConfig()

		const modulePrompt = async (): Promise<{ module: Module }> => {
			return await prompts({
				name: 'module',
				type: 'select',
				message: 'What kind of module do you want to add?',
				choices: [
					{
						title: 'Custom Component',
						value: { type: 'components', pack: 'server' }
					},
					{
						title: 'Collection',
						value: { type: 'collections', pack: 'server' }
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
			})
		}
		const identifierPrompt = async (): Promise<{ identifier: string }> => {
			return await prompts({
				name: 'identifier',
				type: 'text',
				message: 'What is the identifier of your module?'
			})
		}
		const locationPrompt = async (
			identifier: string,
			module: Module,
			config: Config
		): Promise<{ path: string }> => {
			return await prompts({
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
		}

		const { module } = await modulePrompt()
		const { identifier } = await identifierPrompt()
		const { path } = await locationPrompt(identifier, module, config)

		const checkIfAlreadyExists = (): void => {
			if (fse.existsSync(path)) {
				logger.error(`Module at ${blackBright(path)} already exists`)
				process.exit(1)
			}
		}

		if (module.pack === 'server') {
			checkIfAlreadyExists()
			switch (module.type) {
				case 'components':
					fse.outputFileSync(path, getComponent())
					break
				case 'collections':
					fse.outputFileSync(path, getCollection())
					break
				case 'blocks':
					fse.outputFileSync(path, getServerBlock(identifier))
					break
				case 'loot_tables':
					fse.outputFileSync(path, getLootTable(identifier))
					break
				case 'recipes':
					fse.outputFileSync(path, getRecipe(identifier))
			}
			logger.success(
				`Added module ${blue(identifier)} at ${blackBright(path)}`
			)
		}
	}
})
