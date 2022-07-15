import { defineBlock } from 'atropa/server'
import { defineCollection, useHook } from 'atropa/api'
import Attributes from '../components/Attributes'

export default defineCollection(({ add, packs }) => {
	useHook('on:build', () => {
		const blocks = ['grass', 'grass_path', 'grass_path_overlay']

		blocks.map((block) => {
			const grassBlock = defineBlock('1.19.10', ({ use }) => {
				use(Attributes({ name: block }))
			})

			add(`${packs.behaviorPack}/blocks/${block}.json`, grassBlock)
		})
	})
})
