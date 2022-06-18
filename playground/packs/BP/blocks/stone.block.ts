import { defineBlock } from 'volars'

export default defineBlock(({ namespace, formatVersion, description, components }) => {
	formatVersion('1.16.100')
	description({
		identifier: `${namespace}:stone`
	})

	components({
		'minecraft:creative_category': {
			group: 'construction'
		},
		'minecraft:breathability': 'solid',
		'minecraft:block_light_filter': 2,
		'minecraft:block_collision': {
			origin: [0, 0, 0],
			size: [16, 16, 16]
		}
	})
})
