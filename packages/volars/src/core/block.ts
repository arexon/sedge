import { loadConfig } from '../config'

export async function defineBlock(
	fn: (template: BlockTemplate) => void
): Promise<Object> {
	const config = await loadConfig()

	let formatVersion = ''
	let description = {}
	let components = {}

	fn({
		namespace: config.namespace,
		formatVersion: (template) => (formatVersion = template),
		description: (template) => (description = template),
		components: (template) => (components = template)
	})

	return {
		format_version: formatVersion,
		'minecraft:block': {
			description,
			components
		}
	}
}

interface BlockTemplate {
	namespace?: string
	formatVersion: (template: string) => void
	description: (template: Object) => void
	components: (template: Object) => void
}
