import { processTemplate } from './block'
import type {
	ComponentFormat,
	ComponentTemplate
} from '../schema/volars/component'

export function defineComponent<
	Options extends Record<string, unknown>,
	Format extends ComponentFormat
>(
	format: Format,
	fn: (options: Options, template: ComponentTemplate<Format>) => void
): (options?: Options) => object {
	return (options?: Options) => {
		const template = {}

		switch (format) {
			case 'block@1.16.0':
				fn(
					options! || {},
					processTemplate(
						template as never,
						true
					) as ComponentTemplate<Format>
				)
				break

			case 'block@1.16.100':
			case 'block@1.18.10':
			case 'block@1.18.30':
			case 'block@1.19.10':
				fn(
					options! || {},
					processTemplate(
						template as never,
						false
					) as ComponentTemplate<Format>
				)
		}

		return template
	}
}
