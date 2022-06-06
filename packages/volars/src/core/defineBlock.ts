import { Block } from './Block'
import { BlockTemplate } from './types'

export const defineBlock = (fn: (template: BlockTemplate) => void): void => {
	const block = new Block(fn)
	block.init()
	block.transform()
}
