import type { ComponentFormat, ComponentTemplate } from './template'

/**
 * # Define Component
 *
 * Allows to abstract complex logic into small and composables components.
 * @param format The format of the component. E.g. `block@1.19.10`.
 * @param fn A callback function with function parameters used to define the component.
 * @returns A component function.
 */
declare function defineComponent<
	Options extends Record<string, unknown>,
	Format extends ComponentFormat
>(
	format: Format,
	fn: (options: Options, template: ComponentTemplate<Format>) => void
): (options: Options) => object

export { defineComponent, ComponentFormat }
