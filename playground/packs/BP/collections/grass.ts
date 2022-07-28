import { defineBlock, defineCollection, useHook } from 'atropa/core'
import Attributes from '../components/Attributes'

export default defineCollection(({ add, packs }) => {
	useHook('on:build', () => {
		const blocks = ['grass', 'grass_path', 'grass_path_overlay']

		blocks.map((block) => {
			const grassBlock = defineBlock('1.19.10', ({ use }) => {
				use(Attributes({ name: block }))
			}).data

			add(`${packs.behaviorPack}/blocks/${block}.json`, grassBlock)
		})
	})
})
