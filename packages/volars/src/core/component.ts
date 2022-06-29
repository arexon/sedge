import type { ComponentFormat } from '../schema/volars/component'
import { processTemplate } from './block'

export function defineComponent(
	format: ComponentFormat,
	fn: (options: object, template: object) => void
): (options: object) => object {
	return (options: object) => {
		const template = {}

		switch (format) {
			case 'block@1.16.0':
				fn(options || {}, processTemplate(template as never, true))
				break

			case 'block@1.16.100':
			case 'block@1.18.10':
			case 'block@1.18.30':
			case 'block@1.19.10':
				fn(options || {}, processTemplate(template as never, false))
		}

		return template
	}
}
