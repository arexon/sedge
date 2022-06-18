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
		'minecraft:crafting_table': {
			crafting_tags: ['fasdfcas'],
			custom_description: 'safasdcad'
		}
	})
})
