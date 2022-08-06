import { blackBright, blue } from 'colorette'
import fse from 'fs-extra'
import { join } from 'pathe'
import prompts from 'prompts'
import { loadConfig, logger, type Config } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		usage: 'npx sedge add',
		description: 'Scaffold a file template'
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
				| 'functions'
			pack: 'server' | 'client'
		}

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
						title: 'Loot Table',
						value: { type: 'loot_tables', pack: 'server' }
					},
					{
						title: 'Recipe',
						value: { type: 'recipes', pack: 'server' }
					},
					{
						title: 'MC Function',
						value: { type: 'functions', pack: 'server' }
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
					break
				case 'functions':
					fse.outputFileSync(path, getMCFunctionTemplate())
			}
			logger.success(
				`Added file ${blue(identifier)} @ ${blackBright(path)}`
			)
		}
	}
})

function getComponentTemplate(): string {
	return [
		`import { defineComponent } from 'sedge/core'`,
		``,
		`export default defineComponent(`,
		`    'block@1.19.10',`,
		`	({}, { namespace }) => {}`,
		`)`
	].join('\n')
}

function getCollectionTemplate(): string {
	return [
		`import { defineCollection } from 'sedge/core'`,
		``,
		`export default defineCollection(({ add, packs }) => {`,
		`	add(\`\${packs.behaviorPack}/functions/say_hello.mcfunction\`, 'say hello')`,
		`})`
	].join('\n')
}

function getBlockTemplate(identifier: string): string {
	return [
		`import { defineBlock } from 'sedge/core'`,
		``,
		`export default defineBlock('1.19.10', ({ namespace, description }) => {`,
		`	description({`,
		`		identifier: \`\${namespace}:${identifier}\``,
		`	})`,
		`})`
	].join('\n')
}

function getItemTemplate(identifier: string): string {
	return [
		`import { defineItem } from 'sedge/core'`,
		``,
		`export default defineItem('1.19.0', ({ namespace, description }) => {`,
		`	description({`,
		`		identifier: \`\${namespace}:${identifier}\``,
		`	})`,
		`})`
	].join('\n')
}

function getLootTableTemplate(identifier: string): string {
	return [
		`import { defineLootTable } from 'sedge/core'`,
		``,
		`export default defineLootTable(({ namespace, pools }) => {`,
		`	pools([`,
		`		{`,
		`			rolls: 1,`,
		`			entries: {`,
		`				type: 'item',`,
		`				name: \`\${namespace}:${identifier}\`,`,
		`				weight: 1`,
		`			}`,
		`		}`,
		`	])`,
		`})`
	].join('\n')
}

function getRecipeTemplate(identifier: string): string {
	return [
		`import { defineRecipe } from 'sedge/core'`,
		``,
		`export default defineRecipe('shaped', ({ namespace, description }) => {`,
		`	description({`,
		`		identifier: \`\${namespace}:${identifier}\``,
		`	})`,
		`})`
	].join('\n')
}

function getMCFunctionTemplate(): string {
	return [
		`import { defineMCFunction } from 'sedge/core'`,
		``,
		`export default defineMCFunction(({ run }) => {`,
		`	run('say hello')`,
		`})`
	].join('\n')
}
