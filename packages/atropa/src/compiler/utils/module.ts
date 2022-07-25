import createJITI from 'jiti'
import { resolve } from 'pathe'
import { logger } from '../../logger'
import { atropaCacheFolder } from '../constants'

export async function evalModule(
	path: string,
	allowHMR: boolean
): Promise<any> {
	const jiti = createJITI('', {
		cache: atropaCacheFolder,
		requireCache: !allowHMR,
		interopDefault: true,
		onError: (error) => {
			logger.error(error.message)
			process.exit(1)
		}
	})
	return await jiti(resolve(path))
}
