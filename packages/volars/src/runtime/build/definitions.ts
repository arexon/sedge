import fs from 'fs-extra'
import type { TSConfig } from 'pkg-types'
import type { Packs } from '../../config'

export async function createDefinitions(packs: Packs): Promise<void> {
	const definitions = 'node_modules/volars/dist/definitions'
	const tsConfig: TSConfig = {
		compilerOptions: {
			target: 'esnext',
			module: 'esnext',
			moduleResolution: 'node',
			strict: true,
			esModuleInterop: true
		},
		include: [
			'./block.d.ts',
			'./vanilla.d.ts',
			`../${packs.resourcePack.replace(/^.\//, '')}`,
			`../${packs.behaviorPack.replace(/^.\//, '')}`
		]
	}

	await fs.remove('.volars')
	await fs.copy(definitions, '.volars', { dereference: true })
	await fs.writeFile(
		'.volars/tsconfig.json',
		JSON.stringify(tsConfig, null, '\t')
	)
}
