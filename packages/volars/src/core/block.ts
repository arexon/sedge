import { loadVolarsConfig } from '../config'
import type { BlockTemplate } from './types'

export const defineBlock = async (fn: (template: BlockTemplate) => void): Promise<Object> => {
	let src: Object = {}
	const config = await loadVolarsConfig()

	const template: BlockTemplate = {
		namespace: config.namespace,
		formatVersion: (format_version) => (src = { format_version }),
		description: (description) => (src = { ...src, description })
	}
	fn(template)

	return src
}
