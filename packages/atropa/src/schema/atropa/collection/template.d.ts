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
}

export type { CollectionTemplate }
