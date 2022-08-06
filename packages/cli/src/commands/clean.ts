import fse from 'fs-extra'
import { logger } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		usage: 'npx sedge clean',
		description: 'Cleans Sedge build cache'
	},
	run: async () => {
		const cacheDir = '.sedge/cache'
		if (!(await fse.pathExists(cacheDir))) {
			logger.info(`Looks like there's nothing to clean!`)
			return
		}

		await fse.remove(cacheDir)
		logger.success('Cleaned Sedge build cache!')
	}
})
