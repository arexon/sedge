export function getComponent(identifier: string): string {
	return [
		`import { defineComponent } from 'atropa/api'`,
		``,
		`export const ${identifier} = defineComponent(`,
		`    'block@1.19.10',`,
		`	({}, { namespace, description }) => {`,
		`		description({`,
		`			identifier: \`\${namespace}:${identifier}\``,
		`		})`,
		`	}`,
		`)`
	].join('\n')
}

export function getServerBlock(identifier: string): string {
	return [
		`import { defineBlock } from 'atropa/server'`,
		``,
		`export default defineBlock('1.19.10', ({ namespace, description }) => {`,
		`	description({`,
		`		identifier: \`\${namespace}:${identifier}\``,
		`	})`,
		`})`
	].join('\n')
}

export function getLootTable(identifier: string): string {
	return [
		`import { defineLootTable } from 'atropa/server'`,
		``,
		`export default defineLootTable(({ namespace, pools }) => {`,
		`	pools([`,
		`		{`,
		`			rolls: 1,`,
		`			entries: {`,
		`				type: 'item',`,
		`				name: \`\${namespace}:${identifier}\`,`,
		`				weight: 1`,
		`			}`,
		`		}`,
		`	])`,
		`})`
	].join('\n')
}

export function getRecipe(identifier: string): string {
	return [
		`import { defineRecipe } from 'atropa/server'`,
		``,
		`export default defineRecipe(({ namespace, shaped }) => {`,
		`	shaped({`,
		`		description: {`,
		`			identifier: \`\${namespace}:${identifier}\``,
		`		}`,
		`	})`,
		`})`
	].join('\n')
}
