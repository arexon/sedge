import { isObject } from '@antfu/utils'
import fse from 'fs-extra'
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
 * Collections are a way to group related files and/or further transform already existing files.
 * They allow to import files or create templates within and define the export location of said files.
 * @param fn A callback function with function parameters used to define the collection.
 */
export function defineCollection(fn: (template: Template) => void): void {
	try {
		const minify = atropa.mode === 'build' && atropa.config.atropa.minify
		fn({
			namespace: atropa.config.namespace,
			packs: atropa.config.packs,
			add: (path, content) => {
				if (isObject(content)) {
					fse.outputJSONSync(
						normalize(resolveToTargetPath(path)),
						content,
						minify ? undefined : { spaces: '\t' }
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
		throw new Error('Failed to build collection:', error as Error)
	}
}
