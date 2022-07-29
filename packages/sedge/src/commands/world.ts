import { blackBright, blue } from 'colorette'
import fse from 'fs-extra'
import { basename, join, normalize } from 'pathe'
import { comMojangFolder } from '../constants'
import { importAtropa, logger, tryCatch } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'world',
		usage: 'npx sedge world [--save|test] [name]',
		description: 'Saves or tests a world in the "com.mojang" folder.'
	},
	run: async (args) => {
		await tryCatch(async () => {
			if (typeof (args.save || args.test) !== 'string') {
				logger.error('You must specify a world name to save or test.')
				process.exit(1)
			}

			const { loadConfig } = await importAtropa('config')
			const config = await loadConfig()

			if (!comMojangFolder) {
				logger.error(`Could not find ${blue('com.mojang')} folder`)
				process.exit(1)
			}

			if (args.test) {
				await testWorld(join(config.packs.worldTemplate, args.test))
			} else if (args.save) {
				await saveWorld(join(config.packs.worldTemplate, args.save))
			}
		}, `This command requires the ${blue('atropa')} package to be installed in your project`)
	}
})

async function testWorld(path: string): Promise<void> {
	const worldName = basename(path)

	if (!(await fse.pathExists(path))) {
		logger.error(
			`Could not find world ${blue(worldName)} @ ${blackBright(
				normalize(path)
			)}`
		)
		process.exit(1)
	}

	await fse.copy(path, getTargetWorldPath(worldName))

	logger.success(
		`World ${blue(worldName)} copied to ${blackBright('com.mojang')}`
	)
}

async function saveWorld(path: string): Promise<void> {
	const worldName = basename(path)
	const targetPath = getTargetWorldPath(worldName)

	if (!(await fse.pathExists(targetPath))) {
		logger.error(
			`Could not find world ${blue(worldName)} @ ${blackBright(
				'com.mojang'
			)} folder`
		)
		process.exit(1)
	}

	await fse.copy(targetPath, path)

	logger.success(
		`World ${blue(worldName)} saved to ${blackBright(normalize(path))}`
	)
}

function getTargetWorldPath(name: string): string {
	return join(comMojangFolder!, 'minecraftWorlds', name)
}
