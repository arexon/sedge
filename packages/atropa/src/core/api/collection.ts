import fse from 'fs-extra'
import { normalize } from 'pathe'
import { getPath } from '../../compiler/utils'
import { Config } from '../../loader'
import { logger } from '../../logger'
import { Namespace } from '../../schema/atropa/namespace'

type ValueOf<T> = T[keyof T]
interface Template extends Namespace {
	packs: ValueOf<Pick<Config, 'packs'>>
	add: (path: string, content: Record<string, any>) => void
}

export function defineCollection(fn: (template: Template) => void): void {
	try {
		fn({
			namespace: global.config.namespace,
			packs: global.config.packs,
			add: (path, content) => {
				fse.outputJSONSync(normalize(getPath(path)), content, {
					spaces: '\t'
				})
			}
		})
	} catch (error) {
		logger.error('Failed to compile collection:', error)
		process.exit(1)
	}
}
