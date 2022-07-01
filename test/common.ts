import { defineComponent } from '../packages/volars/src'

export const blockComponent = defineComponent(
	'block@1.19.10',
	({ amount }: { amount: number }, { namespace, permutations }) => {
		permutations(
			[...Array(amount).keys()].map((x) => ({
				condition: `q.block_property('${namespace}:foo') == ${x + 1}`,
				components: {
					geometry: `geometry.bar${x + 1}`
				}
			}))
		)
	}
)
