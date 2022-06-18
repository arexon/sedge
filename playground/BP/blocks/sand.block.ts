import { defineBlock } from 'volars'

export default defineBlock(({ namespace, formatVersion, description, components }) => {
	formatVersion('1.16.100')
	description({
		identifier: `${namespace}:sand`
	})

	components({
		'minecraft:aim_ollision': {
			origin: [0, 0, 0],
			size: [4, 8, 8]
		}
	})
})
