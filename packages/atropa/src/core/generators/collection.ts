import fse from 'fs-extra'
import { isObject } from '@antfu/utils'
import { normalize } from 'pathe'
import { resolveToTargetPath } from '../../compiler/utils'
import type { Config } from '../../loader'
import type { Namespace } from '../../schema/atropa/common/template'

type ValueOf<T> = T[keyof T]
interface Template extends Namespace {
	packs: ValueOf<Pick<Config, 'packs'>>
	add: (path: string, content: any) => void
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
			namespace: process._namespace,
			packs: process._packs,
			add: (path, content) => {
				if (isObject(content)) {
					fse.outputJSONSync(
						normalize(resolveToTargetPath(path)),
						content,
						process._minify ? undefined : { spaces: '\t' }
					)
					return
				}

				fse.outputFileSync(
					normalize(resolveToTargetPath(path)),
					content
				)
			}
		})
	} catch (error) {
		throw new Error('Failed to compile collection:', error as Error)
	}
}
