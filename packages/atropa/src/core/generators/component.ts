import type { ItemFormatVersion, ItemTemplate } from '../../schema/atropa/item'
import type { LootTableTemplate } from '../../schema/atropa/loot-table'
import type { RecipeTemplate } from '../../schema/atropa/recipe'
import { tryCatch } from '../utils'
import type { BlockFormatVersion, BlockTemplate } from './block'
import { processTemplate as processBlockTemplate } from './block'
import { processTemplate as processItemTemplate } from './item'
import { processTemplate as processLootTableTemplate } from './loot-table'
import { processTemplate as processRecipeTemplate } from './recipe'

type ComponentFormat =
	| `block@${BlockFormatVersion}`
	| `item@${ItemFormatVersion}`
	| 'lootTable'
	| 'recipe'

type ComponentTemplate<Format extends ComponentFormat> = Omit<
	Format extends 'block@1.16.0'
		? BlockTemplate<'1.16.0'>
		: Format extends 'block@1.16.100'
		? BlockTemplate<'1.16.100'>
		: Format extends 'block@1.18.10'
		? BlockTemplate<'1.18.10'>
		: Format extends 'block@1.18.30'
		? BlockTemplate<'1.18.30'>
		: Format extends 'block@1.19.10'
		? BlockTemplate<'1.19.10'>
		: Format extends 'block@1.19.20'
		? BlockTemplate<'1.19.20'>
		: Format extends 'item@1.10.0'
		? ItemTemplate<'1.10.0'>
		: Format extends 'item@1.16.100'
		? ItemTemplate<'1.16.100'>
		: Format extends 'item@1.17.20'
		? ItemTemplate<'1.17.20'>
		: Format extends 'item@1.18.10'
		? ItemTemplate<'1.18.10'>
		: Format extends 'item@1.19.0'
		? ItemTemplate<'1.19.0'>
		: Format extends 'lootTable'
		? LootTableTemplate
		: Format extends 'recipe'
		? RecipeTemplate
		: never,
	'use'
>

/**
 * # Define Component
 * A Custom Component allows to abstract away complex logic into smaller, composables, and reusable chunks.
 * @param format The format of the component. The first part is for the type of file, second is for the format version for said file.
 * @param fn A callback function with parameters to define the component.
 * @returns A component function with the provided options as parameters.
 */
export function defineComponent<
	Options extends Record<string, any>,
	Format extends ComponentFormat
>(
	format: Format,
	fn: (options: Options, template: ComponentTemplate<Format>) => void
): (options: Options) => Record<string, any> {
	return (options: Options) => {
		return tryCatch(() => {
			const template: Record<string, any> = {}

			switch (format) {
				case 'block@1.16.0':
				case 'block@1.16.100':
				case 'block@1.18.10':
				case 'block@1.18.30':
				case 'block@1.19.10':
					fn(
						options,
						processBlockTemplate(
							template
						) as ComponentTemplate<Format>
					)
					break
				case 'item@1.10.0':
				case 'item@1.16.100':
				case 'item@1.17.20':
				case 'item@1.18.10':
				case 'item@1.19.0':
					fn(
						options,
						processItemTemplate(
							template
						) as ComponentTemplate<Format>
					)
					break
				case 'lootTable':
					fn(
						options,
						processLootTableTemplate(
							template
						) as ComponentTemplate<Format>
					)
					break
				case 'recipe':
					fn(
						options,
						processRecipeTemplate(
							template
						) as ComponentTemplate<Format>
					)
			}
			return template
		}, 'Failed to transform component')
	}
}
