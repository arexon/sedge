import {
	processTemplate,
	transformTemplate
} from '../compiler/transformers/item'
import type {
	ItemFormatVersion,
	ItemTemplate
} from '../schema/atropa/server/item'

/**
 * # Define Item
 *
 * Generates a new item based on the given templates.
 * @param version The format version of the item.
 * @param fn A callback function with function parameters used to define the item.
 * @returns An item.
 */
export function defineItem<Version extends ItemFormatVersion>(
	version: Version,
	fn: (template: ItemTemplate<Version>) => void
): Object {
	try {
		const template = {}

		fn(processTemplate(template) as ItemTemplate<Version>)
		return transformTemplate(template, version)
	} catch (error) {
		throw new Error(`Failed to transform item template`, error as Error)
	}
}
