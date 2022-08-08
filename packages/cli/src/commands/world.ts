import fse from 'fs-extra'
import { basename, join, normalize } from 'pathe'
import { comMojangDir } from '../constants'
import { importSedge, logger } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		usage: 'npx sedge world [--save|--sv] [--test|--ts]',
		description:
			'Saves or tests a world from or to the `com.mojang` directory'
	},
	run: async (args) => {
		if (typeof (args.save || args.test) !== 'string') {
			logger.error('You must specify a world name to save or test')
			process.exit(1)
		}

		const { loadConfig } = await importSedge('compiler')
		const config = await loadConfig()

		if (!comMojangDir) {
			logger.error('Could not find `com.mojang` directory')
			process.exit(1)
		}

		if (args.test) {
			await testWorld(join(config.packs.worldTemplate, args.test))
		} else if (args.save) {
			await saveWorld(join(config.packs.worldTemplate, args.save))
		}
	}
})

async function testWorld(path: string): Promise<void> {
	const worldName = basename(path)

	if (!(await fse.pathExists(path))) {
		logger.error(
			`Could not find world \`${worldName}\` in \`${normalize(path)}\``
		)
		process.exit(1)
	}

	await fse.copy(path, getTargetWorldPath(worldName))

	logger.success(`World \`${worldName}\` copied to \`${'com.mojang'}\``)
}

async function saveWorld(path: string): Promise<void> {
	const worldName = basename(path)
	const targetPath = getTargetWorldPath(worldName)

	if (!(await fse.pathExists(targetPath))) {
		logger.error(
			`Could not find world \`${worldName}\` in the \`${'com.mojang'}\` directory`
		)
		process.exit(1)
	}

	await fse.copy(targetPath, path)

	logger.success(`World \`${worldName}\` saved to \`${normalize(path)}\``)
}

function getTargetWorldPath(name: string): string {
	return join(comMojangDir!, 'minecraftWorlds', name)
}
