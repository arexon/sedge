import { loadConfig } from '../config'

export async function defineBlock(
	fn: (template: BlockTemplate) => void
): Promise<Object> {
	const config = await loadConfig()

	let format_version = ''
	let description = {}
	let components = {}

	fn({
		namespace: config.namespace,
		formatVersion: (template) => (format_version = template),
		description: (template) => (description = template),
		components: (template) => (components = template)
	})

	return {
		format_version,
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
