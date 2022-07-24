import { isObject } from '@antfu/utils'
import {
	removeFileFromTarget,
	writeFileToTarget,
	writeJsonFileToTarget
} from '../../compiler/utils'
import type { CollectionTemplate } from '../../schema/atropa/collection/template'

/**
 * # Define Collection
 *
 * Collections are a way to group related files and/or further transform already existing files.
 * They allow to import files or create templates within and define the export location of said files.
 * @param fn A callback function with function parameters used to define the collection.
 */
export function defineCollection(
	fn: (template: CollectionTemplate) => void
): void {
	try {
		fn(processTemplate())
	} catch (error) {
		throw new Error('Failed to build collection:', error as Error)
	}
}

function processTemplate(): CollectionTemplate {
	return {
		namespace: atropa.config.namespace,
		packs: atropa.config.packs,
		add: (path, content) => {
			if (isObject(content)) {
				writeJsonFileToTarget(path, content)
				return
			}
			writeFileToTarget(path, content)
		},
		remove: (path) => {
			removeFileFromTarget(path)
		}
	}
}
