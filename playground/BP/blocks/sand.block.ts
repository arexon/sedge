import { defineBlock } from 'volars'

export default defineBlock(({ namespace, formatVersion, description }) => {
	formatVersion('1.16.100')
	description({
		identifier: `${namespace}:sand`
	})
})
