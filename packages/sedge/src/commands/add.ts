import fse from 'fs-extra'
import prompts from 'prompts'
import { join } from 'pathe'
import { blackBright, blue } from 'colorette'
import {
	getBlockTemplate,
	getComponentTemplate,
	getLootTableTemplate,
	getRecipeTemplate,
	importAtropa,
	getCollectionTemplate,
	getItemTemplate,
	logger,
	type Config
} from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'add',
		usage: 'npx sedge add',
		description: 'Scaffolds a file template'
	},
	run: async () => {
		interface File {
			type:
				| 'components'
				| 'collections'
				| 'blocks'
				| 'items'
				| 'recipes'
				| 'loot_tables'
			pack: 'server' | 'client'
		}

		const { loadConfig } = await importAtropa('config')
		const config = await loadConfig()

		const filePrompt = async (): Promise<{ file: File }> => {
			return await prompts({
				name: 'file',
				type: 'select',
				message: 'What kind of file do you want to add?',
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
						title: 'Server Item',
						value: { type: 'items', pack: 'server' }
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
				message: 'What is the identifier of your file?'
			})
		}
		const locationPrompt = async (
			identifier: string,
			module: File,
			config: Config
		): Promise<{ path: string }> => {
			return await prompts({
				name: 'path',
				type: 'text',
				message: 'Where do you want to add your file?',
				initial: join(
					module.pack === 'server'
						? config.packs.behaviorPack
						: config.packs.resourcePack,
					module.type,
					`${identifier}.ts`
				)
			})
		}

		const { file } = await filePrompt()
		const { identifier } = await identifierPrompt()
		const { path } = await locationPrompt(identifier, file, config)

		const checkIfAlreadyExists = (): void => {
			if (fse.existsSync(path)) {
				logger.error(`File at ${blackBright(path)} already exists`)
				process.exit(1)
			}
		}

		if (file.pack === 'server') {
			checkIfAlreadyExists()
			switch (file.type) {
				case 'components':
					fse.outputFileSync(path, getComponentTemplate())
					break
				case 'collections':
					fse.outputFileSync(path, getCollectionTemplate())
					break
				case 'blocks':
					fse.outputFileSync(path, getBlockTemplate(identifier))
					break
				case 'items':
					fse.outputFileSync(path, getItemTemplate(identifier))
					break
				case 'loot_tables':
					fse.outputFileSync(path, getLootTableTemplate(identifier))
					break
				case 'recipes':
					fse.outputFileSync(path, getRecipeTemplate(identifier))
			}
			logger.success(
				`Added file ${blue(identifier)} @ ${blackBright(path)}`
			)
		}
	}
})
