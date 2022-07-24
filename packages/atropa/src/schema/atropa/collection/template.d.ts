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
	 * Adds a file to the collection and writes it to the target.
	 * @param path The path to write to. Must be within the packs.
	 * @param content The content of the file. If the content is an object, it will be written as JSON. Otherwise, it will be written as a string.
	 */
	add: (path: string, content: any) => void
	/**
	 * # Remove
	 * Remove any file in target output.
	 * @param path The path to remove. Must be within the packs.
	 */
	remove: (path: string) => void
}

export type { CollectionTemplate }
