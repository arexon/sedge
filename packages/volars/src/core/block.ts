import { loadConfig } from '../config'
import { BlockTemplate } from '../types/template/block'

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
