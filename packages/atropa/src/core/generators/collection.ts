import type { CollectionTemplate } from '../../schema/atropa/collection/template'

interface CollectionResult {
	type: 'collection'
	data: Map<string, any>
}

/**
 * # Define Collection
 * Collections are a way to group related files and/or further transform already existing files.
 * They allow to import files or create templates within and define the export location of said files.
 * @param fn A callback function with parameters to define the collection.
 */
export function defineCollection(
	fn: (template: CollectionTemplate) => void
): CollectionResult {
	try {
		const template: CollectionResult = {
			type: 'collection',
			data: new Map<string, any>([])
		}

		fn(processTemplate(template))
		return template
	} catch (error) {
		throw new Error(`Failed to build collection: ${error}`)
	}
}

function processTemplate(template: CollectionResult): CollectionTemplate {
	return {
		namespace: atropa.config.namespace,
		packs: atropa.config.packs,
		add: (path, content) => template.data.set(path, content),
		remove: (path) => template.data.delete(path),
		has: (path) => template.data.has(path),
		get: (path) => template.data.get(path).data
	}
}
