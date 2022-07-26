import type { Config } from '../../../loader'
import type { Namespace } from '../common/template'

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
	 * @param path The path to remove. Must match a file in the collection.
	 */
	remove(path: string): void
	/**
	 * # Has
	 * Checks if a file is in the collection.
	 * @param path The path to the file.
	 */
	has(path: string): boolean
	/**
	 * # Get
	 * Gets *compiled* file content from the collection.
	 * @param path The path to the file.
	 */
	get(path: string): any
}

export type { CollectionTemplate }
