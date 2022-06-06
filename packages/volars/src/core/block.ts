import { loadVolarsConfig, VolarsConfig } from '../config'
import { BlockTemplate } from './types'

export class Block {
	private template: BlockTemplate | undefined
	private output: Object = {}
	private load: Function
	private config: VolarsConfig | undefined

	constructor(fn: (template: BlockTemplate) => void) {
		this.load = fn
	}

	public async init(): Promise<void> {
		this.config = await loadVolarsConfig()
	}

	public async transform(): Promise<void> {
		this.template = {
			namespace: this.config?.namespace,
			formatVersion: (data) => (this.output = { format_version: data }),
			description: (data) => (this.output = { ...this.output, description: data })
		}
		this.load(this.template)

		console.log(JSON.stringify(this.output, null, '\t'))
	}
}
