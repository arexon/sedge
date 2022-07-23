export function getComponentTemplate(): string {
	return [
		`import { defineComponent } from 'atropa/core'`,
		``,
		`export default defineComponent(`,
		`    'block@1.19.10',`,
		`	({}, { namespace }) => {}`,
		`)`
	].join('\n')
}

export function getCollectionTemplate(): string {
	return [
		`import { defineCollection } from 'atropa/core'`,
		``,
		`export default defineCollection(({ add, packs }) => {`,
		`	add(\`\${packs.behaviorPack}/functions/say_hello.mcfunction\`, 'say hello')`,
		`})`
	].join('\n')
}

export function getBlockTemplate(identifier: string): string {
	return [
		`import { defineBlock } from 'atropa/core'`,
		``,
		`export default defineBlock('1.19.10', ({ namespace, description }) => {`,
		`	description({`,
		`		identifier: \`\${namespace}:${identifier}\``,
		`	})`,
		`})`
	].join('\n')
}

export function getItemTemplate(identifier: string): string {
	return [
		`import { defineItem } from 'atropa/core'`,
		``,
		`export default defineItem('1.19.0', ({ namespace, description }) => {`,
		`	description({`,
		`		identifier: \`\${namespace}:${identifier}\``,
		`	})`,
		`})`
	].join('\n')
}

export function getLootTableTemplate(identifier: string): string {
	return [
		`import { defineLootTable } from 'atropa/core'`,
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

export function getRecipeTemplate(identifier: string): string {
	return [
		`import { defineRecipe } from 'atropa/core'`,
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
