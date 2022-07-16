import fse from 'fs-extra'
import { normalize } from 'pathe'
import { getPath } from '../../compiler/utils'
import { logger } from '../../logger'
import type { Namespace } from '../../schema/atropa/namespace'
import type { Config } from '../../loader'

type ValueOf<T> = T[keyof T]
interface Template extends Namespace {
	packs: ValueOf<Pick<Config, 'packs'>>
	add: (path: string, content: Record<string, any>) => void
}

/**
 * # Define Collection
 *
 * Collections are a way to organize a feature set into a single group.
 * They allow to import files or create templates within and define the export location of said files/templates.
 * @param fn A callback function with function parameters used to define the collection.
 */
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
