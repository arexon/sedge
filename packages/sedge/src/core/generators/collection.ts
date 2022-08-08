import type { Config } from '../../compiler/config'
import { tryCatch } from '../utils'
import type { Namespace } from './types'

type ValueOf<T> = T[keyof T]

interface CollectionTemplate extends Namespace {
	/**
	 * # Packs
	 * The pack paths defined in `config.json`.
	 */
	packs: ValueOf<Pick<Config, 'packs'>>
	/**
	 * # Add
	 * Adds a file to the collection.
	 * @param path The path to write to. You can use `pack` to construct a path.
	 * @param content The content of the file.
	 */
	add(path: string, content: any): void
	/**
	 * # Remove
	 * Remove a file from the collection.
	 * @param path The path to remove. Must match a file path in the collection.
	 */
	remove(path: string): void
	/**
	 * # Has
	 * Checks if a file is in the collection.
	 * @param path The path to the file. Must match a file path in the collection.
	 */
	has(path: string): boolean
	/**
	 * # Get
	 * Gets the compiled version of a file from the collection.
	 * @param path The path to the file.
	 */
	get(path: string): any
}

interface CollectionResult {
	type: 'collection'
	data: Map<string, any>
}

/**
 * # Define Collection
 * Collections are a way to group related files and/or further transform already existing files.
 * They allow to import files or create templates within and define the export location of said files.
 * @param fn A function to define the collection.
 * @returns A collection result.
 */
export function defineCollection(
	fn: (template: CollectionTemplate) => void
): CollectionResult {
	return tryCatch(() => {
		const template: CollectionResult = {
			type: 'collection',
			data: new Map<string, any>([])
		}

		fn(processTemplate(template))

		return template
	}, 'Failed to compile collection')
}

function processTemplate(template: CollectionResult): CollectionTemplate {
	return {
		namespace: sedge.config.namespace,
		packs: sedge.config.packs,
		add: (path, content) => template.data.set(path, content),
		remove: (path) => template.data.delete(path),
		has: (path) => template.data.has(path),
		get: (path) => template.data.get(path).data
	}
}
