import type { RecipeTagTypes } from './general'

type RecipePattern = [string, string, string] | [string, string] | [string]
interface RecipeResult {
	/**
	 * ## Item
	 * Provides the identifier of the item.
	 */
	item: string
	/**
	 * ## Data
	 * Sets the result item's data value.
	 */
	data?: number
	/**
	 * ## Count
	 * Sets how many of the result item should be output.
	 */
	count?: number
}
interface RecipeKey {
	[key: string]: {
		/**
		 * ## Item
		 * Provides the identifier for the result item.
		 */
		item: string
		/**
		 * ## Data
		 * Sets the result item's data value.
		 */
		data?: number | string
	}
}

export type { RecipeTagTypes, RecipeResult, RecipeKey, RecipePattern }
