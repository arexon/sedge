import { loadVolarsConfig, VolarsConfig } from '../config'

type FormatVersion = '1.16.100'

interface Description {
	identifier: string
}

interface BlockTemplate {
	namespace?: string

	formatVersion: (data: FormatVersion) => void
	description: (data: Description) => void
}

class Block {
	private template: BlockTemplate | undefined
	private output: Object = {}
	private load: Function
	private config: VolarsConfig | undefined

	constructor(fn: (template: BlockTemplate) => void) {
		this.load = fn
	}

	public async transform(): Promise<void> {
		this.config = await loadVolarsConfig()

		this.template = {
			namespace: this.config.namespace,
			formatVersion: (data) => (this.output = { format_version: data }),
			description: (data) => (this.output = { ...this.output, description: data })
		}
		this.load(this.template)

		console.log(JSON.stringify(this.output, null, '\t'))
	}
}

export const defineBlock = (fn: (template: BlockTemplate) => void): void => {
	const block = new Block(fn)
	block.transform()
}
