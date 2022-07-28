import { deepMerge, objectMap } from '@antfu/utils'
import type { Randomize, Sequence } from '../../schema/event/common'
import type { ItemComponents_1_10_0 } from '../../schema/item/v1.10.0'
import type {
	ItemComponents_1_16_100,
	ItemEventResponses_1_16_100
} from '../../schema/item/v1.16.100'
import type { ItemComponents_1_17_20 } from '../../schema/item/v1.17.20'
import type { ItemComponents_1_18_10 } from '../../schema/item/v1.18.10'
import type { ItemComponents_1_19_0 } from '../../schema/item/v1.19.0'
import { ensureNamespaces, tryCatch } from '../utils'
import type {
	Description,
	DescriptionExperimental,
	Namespace,
	UseFunction
} from './types'

interface ItemDescriptionFunction {
	/**
	 * # Description
	 * The description sets required item information.
	 * @param template The description template.
	 */
	description: (template: Description & DescriptionExperimental) => void
}

interface ItemComponentsFunction<Components extends Record<string, any>> {
	/**
	 * # Components
	 * Components are used to describe the item's attributes and behavior.
	 * @param template The components to add to the item.
	 */
	components: (template: Components) => void
}

interface ItemEventsFunction<Events extends Record<string, any>> {
	/**
	 * # Events
	 * The events function defines the events that can be triggered by this item.
	 * @param template The events to add to the item.
	 */
	events: (template: Record<string, Events>) => void
}

interface ItemTemplate_1_10_0
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_10_0> {}

interface ItemTemplate_1_16_100
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_16_100>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

interface ItemTemplate_1_17_20
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_17_20>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

interface ItemTemplate_1_18_10
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_18_10>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

interface ItemTemplate_1_19_0
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_19_0>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

export type ItemFormatVersion =
	| '1.10.0'
	| '1.16.100'
	| '1.17.20'
	| '1.18.10'
	| '1.19.0'

export type ItemTemplate<Version extends ItemFormatVersion> =
	(Version extends '1.10.0'
		? ItemTemplate_1_10_0
		: Version extends '1.16.100'
		? ItemTemplate_1_16_100
		: Version extends '1.17.20'
		? ItemTemplate_1_17_20
		: Version extends '1.18.10'
		? ItemTemplate_1_18_10
		: Version extends '1.19.0'
		? ItemTemplate_1_19_0
		: never) &
		Namespace &
		UseFunction

type UserTemplate = Partial<ItemTemplate<'1.19.0'>>
interface VanillaTemplate {
	description?: Record<string, any>
	components?: Record<string, any>
	events?: Record<string, any>
}
interface Item {
	format_version: string
	'minecraft:item': VanillaTemplate
}
interface ItemResult {
	type: 'item'
	data: Item
}

/**
 * # Define Item
 * Generates a new item based on the given templates.
 * @param version The format version of the item.
 * @param fn A function that defines the item.
 * @returns A module result that contains the item.
 */
export function defineItem<Version extends ItemFormatVersion>(
	version: Version,
	fn: (template: ItemTemplate<Version>) => void
): ItemResult {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as ItemTemplate<Version>)

		return {
			type: 'item',
			data: transformTemplate(template, version)
		}
	}, 'Failed to transform item template')
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		description: (_template) => {
			template.description = { ...template.description, ..._template }
		},
		components: (_template) => {
			template.components = { ...template.components, ..._template }
		},
		events: (_template) => {
			template.events = { ...template.events, ..._template }
		},
		use: (...components) => {
			deepMerge(template, ...components)
		}
	}
}

function transformTemplate(template: VanillaTemplate, version: string): Item {
	const transformedTemplate = objectMap(
		template as Required<VanillaTemplate>,
		(key, value) => {
			if (key === 'components') {
				return [key, ensureNamespaces(value, 'minecraft')]
			}
			return [key, value]
		}
	) as VanillaTemplate

	return {
		format_version: version,
		'minecraft:item': transformedTemplate
	}
}
