import { logger } from '../logger'
import { prependNamespacesInArray, prependNamespacesInObject } from './utils'

interface Template {
	namespace: string
	description: (template: object) => void
	permutations?: (template: object[]) => void
	components: (template: object) => void
	events?: (template: object) => void
}

export async function defineBlock(
	version: string,
	block: (template: Template) => void
): Promise<object> {
	let description: object = {}
	let permutations: object[] = []
	let components: object = {}
	let events: object = {}

	try {
		block({
			namespace: global.config.namespace,
			description: (template) => (description = template),
			...(version !== '1.16.0' && {
				permutations: (template) => {
					permutations = template || []
				},
				events: (template) => {
					events = template || {}
				}
			}),
			components: (template) => (components = template || {})
		})

		return {
			format_version: version,
			'minecraft:block': {
				description,
				...(version !== '1.16.0' && {
					permutations: prependNamespacesInArray(
						permutations,
						'components' as keyof object,
						'minecraft'
					)
				}),
				components: prependNamespacesInObject(components, 'minecraft'),
				...(version !== '1.16.0' && { events })
			}
		}
	} catch (error) {
		logger.error(`Failed to parse block:`, error)
		logger.trace(defineBlock)
		process.exit(0)
	}
}
