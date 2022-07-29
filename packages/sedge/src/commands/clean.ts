import { blue } from 'colorette'
import fse from 'fs-extra'
import { logger, tryCatch } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'clean',
		usage: 'npx sedge clean',
		description: 'Cleans build cache.'
	},
	run: async () => {
		await tryCatch(async () => {
			const cacheFolder = '.atropa/cache'
			if (!(await fse.pathExists(cacheFolder))) {
				logger.info(`Looks like there's nothing to clean!`)
				return
			}

			await fse.remove(cacheFolder)
			logger.success('Cleaned Atropa build cache!')
		}, `This command requires the ${blue('atropa')} package to be installed in your project`)
	}
})
