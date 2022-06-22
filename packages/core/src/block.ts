import { loadConfig } from 'volars-config'
import { BlockTemplate, FormatVersion } from 'volars-schema'

/**
 * # Define Block
 *
 * Creates a new block based on the given template.
 */
export async function defineBlock<Version extends FormatVersion>(
	formatVersion: Version,
	block: (template: BlockTemplate<Version>) => void
): Promise<Object> {
	const config = await loadConfig()

	let description = {}
	let components = {}

	block({
		namespace: config.namespace,
		description: (template) => (description = template),
		components: (template) => (components = template)
	})

	return {
		format_version: formatVersion,
		'minecraft:block': {
			description,
			components: prependNamespaces(components, 'minecraft')
		}
	}
}

function prependNamespaces(
	object: Record<string, any>,
	namespace: string
): object {
	for (const key in object) {
		object[`${namespace}:${key}`] = object[key]
		delete object[key]
	}
	return object
}
