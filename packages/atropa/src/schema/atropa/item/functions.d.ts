import type { Description } from '../common/template'

interface ItemDescriptionFunction {
	/**
	 * # Description
	 * The description sets required item information.
	 * @param template The description template.
	 */
	description: (template: Description) => void
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

export type {
	ItemDescriptionFunction,
	ItemComponentsFunction,
	ItemEventsFunction
}
