import createJITI from 'jiti'
import { resolve } from 'pathe'
import { logger } from '../../logger'
import { atropaCacheFolder } from '../constants'

export async function importModule(path: string, cache = false): Promise<any> {
	const jiti = createJITI('', {
		cache: atropaCacheFolder,
		requireCache: cache,
		interopDefault: true,
		onError: (error) => {
			logger.error(error.message)
			process.exit(1)
		}
	})
	return await jiti(resolve(path))
}
