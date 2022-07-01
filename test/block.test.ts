import { describe, expect, it } from 'vitest'
import { defineBlock } from '../packages/volars'
import { blockComponent } from './common'

describe('define block', () => {
	it.concurrent('return a block', () => {
		const block = defineBlock(
			'1.19.10',
			({ namespace, description, components, permutations, events }) => {
				const isBreathable = `${namespace}:is_breathable`
				const makeBreathable = `${namespace}:make_breathable`

				description({
					identifier: `${namespace}:foo`,
					properties: { [isBreathable]: [false, true] }
				})

				permutations([
					{
						condition: `q.block_property('${isBreathable}') == true`,
						components: { breathability: 'air' }
					}
				])

				components({
					on_interact: {
						condition: 'q.is_sneaking',
						event: makeBreathable
					}
				})

				events({
					[makeBreathable]: {
						set_block_property: { [isBreathable]: true }
					}
				})
			}
		)

		expect(block).toStrictEqual({
			format_version: '1.19.10',
			'minecraft:block': {
				description: {
					identifier: 'test:foo',
					properties: { 'test:is_breathable': [false, true] }
				},
				components: {
					'minecraft:on_interact': {
						condition: 'q.is_sneaking',
						event: 'test:make_breathable'
					}
				},
				permutations: [
					{
						condition: `q.block_property('test:is_breathable') == true`,
						components: { 'minecraft:breathability': 'air' }
					}
				],
				events: {
					'test:make_breathable': {
						set_block_property: { 'test:is_breathable': true }
					}
				}
			}
		})
	})

	it.concurrent('return a legacy block', () => {
		const block = defineBlock(
			'1.16.0',
			({ namespace, components, description }) => {
				const burnOdds = 30

				description({
					identifier: `${namespace}:foo`
				})

				components({
					flammable: { burn_odds: burnOdds, flame_odds: burnOdds }
				})
			}
		)

		expect(block).toStrictEqual({
			format_version: '1.16.0',
			'minecraft:block': {
				description: { identifier: 'test:foo' },
				components: {
					'minecraft:flammable': { burn_odds: 30, flame_odds: 30 }
				}
			}
		})
	})

	it.concurrent('return a block with a custom component', () => {
		const block = defineBlock('1.19.10', () => {}, [
			blockComponent({ amount: 3 })
		])

		expect(block).toStrictEqual({
			format_version: '1.19.10',
			'minecraft:block': {
				permutations: [
					{
						condition: `q.block_property('test:foo') == 1`,
						components: { 'minecraft:geometry': 'geometry.bar1' }
					},
					{
						condition: `q.block_property('test:foo') == 2`,
						components: { 'minecraft:geometry': 'geometry.bar2' }
					},
					{
						condition: `q.block_property('test:foo') == 3`,
						components: { 'minecraft:geometry': 'geometry.bar3' }
					}
				]
			}
		})
	})
})
