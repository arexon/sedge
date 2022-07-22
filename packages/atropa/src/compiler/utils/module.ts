import createJITI from 'jiti'
import { resolve } from 'pathe'
import { atropaCacheDir } from '../../constants'
import { logger } from '../../logger'

export async function importModule(path: string, cache = false): Promise<any> {
	const jiti = createJITI('', {
		cache: atropaCacheDir,
		requireCache: cache,
		interopDefault: true,
		sourceMaps: true,
		onError: (error) => {
			logger.error(error.message)
			process.exit(1)
		}
	})
	return await jiti(resolve(path))
}
