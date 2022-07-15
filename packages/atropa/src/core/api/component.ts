import fse from 'fs-extra'
import { join } from 'pathe'
import { processTemplate as processBlockTemplate } from '../server/block'
import { getPath } from '../../compiler/utils'
import { logger } from '../../logger'
import type {
	ComponentFormat,
	ComponentTemplate,
	LootTableFunction,
	RecipeFunction
} from '../../schema/atropa/server/component'

/**
 * # Define Component
 *
 * Allows to abstract away complex logic into smaller, composables, and reusable components.
 * @param format The format of the component.
 * The first part is for which element, second is for the format version for said element.
 * @param fn A callback function with function parameters used to define the component.
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
					fn(
						options || ({} as Options),
						processBlockTemplate(
							template,
							true
						) as ComponentTemplate<Format>
					)
					break

				case 'block@1.16.100':
				case 'block@1.18.10':
				case 'block@1.18.30':
				case 'block@1.19.10':
					fn(options || ({} as Options), {
						...processBlockTemplate(template, false),
						...processComponentTemplate()
					} as unknown as ComponentTemplate<Format>)
			}

			return template
		} catch (error) {
			logger.error('Failed to parse component:', error)
			process.exit(1)
		}
	}
}

function processComponentTemplate(): LootTableFunction & RecipeFunction {
	return {
		lootTable: (template, path) => {
			fse.outputJSONSync(
				getPath(join(global.config.packs.behaviorPack, path)),
				template,
				{ spaces: '\t' }
			)
		},
		recipe: (template, path) => {
			const originalKey = Object.keys(
				template
			)[0] as keyof typeof template
			const newKey = `minecraft:${originalKey}` as keyof typeof template
			template[newKey] = template[originalKey]
			delete template[originalKey]

			fse.outputJSONSync(
				getPath(join(global.config.packs.behaviorPack, path)),
				{ format_version: '1.12.0', ...template },
				{ spaces: '\t' }
			)
		}
	}
}
