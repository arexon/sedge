import type {
	ComponentFormat,
	ComponentTemplate
} from '../../schema/atropa/component'
import { processTemplate as processBlockTemplate } from './block'
import { processTemplate as processItemTemplate } from './item'

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
): (options?: Options) => Record<string, any> {
	return (options?: Options) => {
		try {
			const template: Record<string, any> = {}

			switch (format) {
				case 'block@1.16.0':
				case 'block@1.16.100':
				case 'block@1.18.10':
				case 'block@1.18.30':
				case 'block@1.19.10':
					fn(
						options || ({} as Options),
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
						options || ({} as Options),
						processItemTemplate(
							template
						) as ComponentTemplate<Format>
					)
			}
			return template
		} catch (error) {
			throw new Error('Failed to parse component:', error as Error)
		}
	}
}
