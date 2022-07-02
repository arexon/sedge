import { resolve } from 'pathe'
import { processTemplate } from './block'
import { writeJsonFile } from '../runtime/utils'
import type {
	ComponentFormat,
	ComponentTemplate
} from '../schema/volars/component'

export function defineComponent<
	Options extends Record<string, any>,
	Format extends ComponentFormat
>(
	format: Format,
	fn: (options: Options, template: ComponentTemplate<Format>) => void
): (options?: Options) => Record<string, any> {
	return (options?: Options) => {
		const template = {}

		switch (format) {
			case 'block@1.16.0':
				fn(
					// @ts-expect-error - this is valid
					options || {},
					processTemplate(
						template,
						true
					) as ComponentTemplate<'block@1.16.0'>
				)
				break

			case 'block@1.16.100':
			case 'block@1.18.10':
			case 'block@1.18.30':
			case 'block@1.19.10':
				fn(
					// @ts-expect-error - this is valid
					options || {},
					{
						...processTemplate(template, true),
						lootTable: async (template, path) => {
							await writeJsonFile(
								resolve(
									global.target.path,
									global.config.packs.behaviorPack,
									path
								),
								template
							)
						}
					} as ComponentTemplate<'block@1.16.100'>
				)
		}

		return template
	}
}
