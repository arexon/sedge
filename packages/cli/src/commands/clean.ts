import fse from 'fs-extra'
import { logger } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'clean',
		usage: 'npx sedge clean',
		description: 'Remove build cache'
	},
	run: async () => {
		const cacheFolder = '.sedge/cache'
		if (!(await fse.pathExists(cacheFolder))) {
			logger.info(`Looks like there's nothing to clean!`)
			return
		}

		await fse.remove(cacheFolder)
		logger.success('Cleaned Sedge build cache!')
	}
})
