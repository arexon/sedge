import { describe, expect, it } from 'vitest'
import block from '#playground/BP/blocks/radio.block'

describe('define block', () => {
	it('returns a valid block object', () => {
		expect(block).toStrictEqual({
			format_version: '1.19.10',
			'minecraft:block': {
				description: {
					properties: {
						'test:is_on': [false, true]
					},
					identifier: 'test:radio'
				},
				components: {
					'minecraft:on_interact': {
						condition: 'q.is_sneaking',
						event: 'test:toggle'
					},
					'minecraft:display_name': 'test:radio',
					'minecraft:loot': 'loot_tables/block/radio.loot.json'
				},
				permutations: [
					{
						condition: "q.block_property('test:is_on') == false",
						components: {
							'minecraft:geometry': 'geometry.radio.off'
						}
					},
					{
						condition: "q.block_property('test:is_on') == true",
						components: {
							'minecraft:geometry': 'geometry.radio.on'
						}
					}
				],
				events: {
					'test:toggle': {
						set_block_property: {
							'test:is_on': "!q.block_property('test:is_on')"
						}
					}
				}
			}
		})
	})
})
