import { resolve } from 'pathe'
import { processTemplate as processBlockTemplate } from './block'
import { writeJsonFile } from '../runtime/utils'
import type {
	ComponentFormat,
	ComponentTemplate
} from '../schema/volars/component'
import type { LootTable, Recipe } from '../schema/volars/component/functions'

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
					processBlockTemplate(
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
						...processBlockTemplate(template, false),
						...processComponentTemplate()
					} as ComponentTemplate<'block@1.16.100'>
				)
		}

		return template
	}
}

// Compiles custom component specific templates.
function processComponentTemplate(): LootTable & Recipe {
	return {
		lootTable: async (template, path) => {
			await writeJsonFile(
				resolve(
					global.target.path,
					global.config.packs.behaviorPack,
					path
				),
				template
			)
		},
		recipe: async (template, path) => {
			const key = Object.keys(template)[0]
			// @ts-expect-error - this is valid
			template[`minecraft:${key}`] = template[key]
			// @ts-expect-error - this is valid
			delete template[key]

			await writeJsonFile(
				resolve(
					global.target.path,
					global.config.packs.behaviorPack,
					path
				),
				{ format_version: '1.12', ...template }
			)
		}
	}
}
