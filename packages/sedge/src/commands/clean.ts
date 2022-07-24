import fse from 'fs-extra'
import { blue } from 'colorette'
import { defineCommand } from './index'
import { logger } from '../utils'

export default defineCommand({
	meta: {
		name: 'clean',
		usage: 'npx sedge clean',
		description: 'Cleans build cache.'
	},
	run: async () => {
		try {
			const cacheFolder = '.atropa/cache'
			if (!(await fse.pathExists(cacheFolder))) {
				logger.info(`Looks like there's nothing to clean!`)
				return
			}

			await fse.remove(cacheFolder)
			logger.success('Cleaned Atropa build cache!')
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
