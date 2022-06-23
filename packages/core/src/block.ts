import { loadConfig } from 'volars-config'
import { BlockTemplate, FormatVersion } from 'volars-schema'
import { prependNamespacesInArray, prependNamespacesInObject } from './utils'
import { logger } from './logger'

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
	const config = await loadConfig()

	let description: BlockObject = {}
	let components: BlockObject = {}
	let permutations: BlockObject[] = []

	try {
		block({
			namespace: config.namespace,
			description: (template: BlockObject) => (description = template),
			...(formatVersion !== '1.16.0' && {
				permutations: (template: BlockObject[]) => {
					permutations = template
				}
			}),
			components: (template: BlockObject) => (components = template)
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
				components: prependNamespacesInObject(components, 'minecraft')
			}
		}
	} catch (error) {
		logger.error(`Failed to parse block:`, error)
		process.exit(0)
	}
}
