import { logger } from '../logger'
import { prependNamespacesInArray, prependNamespacesInObject } from './utils'
import { BlockTemplate, FormatVersion } from '../schema'

/**
 * # Define Block
 *
 * Generates a new block based on the given templates.
 */
export async function defineBlock<Version extends FormatVersion>(
	formatVersion: Version,
	block: (template: BlockTemplate<Version>) => void
): Promise<Object | unknown> {
	type BlockObject = Record<string, any>
	let description: BlockObject = {}
	let permutations: BlockObject[] = []
	let components: BlockObject = {}
	let events: BlockObject = {}

	try {
		block({
			namespace: global.config.namespace,
			description: (template: BlockObject) => (description = template),
			...(formatVersion !== '1.16.0' && {
				permutations: (template: BlockObject[]) => {
					permutations = template || []
				},
				events: (template: BlockObject) => {
					events = template || {}
				}
			}),
			components: (template: BlockObject) => (components = template || {})
		} as any)

		return {
			format_version: formatVersion,
			'minecraft:block': {
				description,
				...(formatVersion !== '1.16.0' && {
					permutations: prependNamespacesInArray(
						permutations,
						'components',
						'minecraft'
					)
				}),
				components: prependNamespacesInObject(components, 'minecraft'),
				...(formatVersion !== '1.16.0' && { events })
			}
		}
	} catch (error) {
		logger.error(`Failed to parse block:`, error)
		process.exit(0)
	}
}
