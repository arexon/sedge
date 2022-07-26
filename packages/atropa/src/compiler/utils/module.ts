import { isObject } from '@antfu/utils'
import createJITI from 'jiti'
import { resolve } from 'pathe'
import { logger } from '../../logger'
import { atropaCacheFolder } from '../constants'
import { writeFileToTarget, writeJsonFileToTarget } from './fs'

type ModuleResult = {
	type: 'file' | 'collection'
	data: any
}

export async function compileModule(
	path: string,
	options: { allowHMR: boolean }
): Promise<void> {
	const result = await evalModule(resolve(path), options)

	switch (result.type) {
		case 'collection':
			for (const [path, content] of await result.data) {
				if (isObject(content)) {
					writeJsonFileToTarget(path, content)
					continue
				}
				writeFileToTarget(path, content)
			}
			break
		default:
			if (isObject(result)) writeJsonFileToTarget(path, result)
			else writeFileToTarget(path, result)
	}
}

export async function evalModule(
	path: string,
	options: { allowHMR: boolean }
): Promise<ModuleResult> {
	const jiti = createJITI('', {
		cache: atropaCacheFolder,
		requireCache: !options.allowHMR,
		interopDefault: true,
		onError: (error) => {
			logger.error(error.message)
			process.exit(1)
		}
	})
	return await jiti(path)
}
