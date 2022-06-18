import fs from 'fs-extra'
import { TSConfig } from 'pkg-types'

export async function createDefinitions(): Promise<void> {
	const definitions = 'node_modules/volars/dist/definitions'
	const tsConfig: TSConfig = {
		compilerOptions: {
			target: 'esnext',
			module: 'esnext',
			moduleResolution: 'node',
			strict: true,
			esModuleInterop: true
		},
		include: ['./block.d.ts', './vanilla.d.ts', '../BP']
	}

	await fs.remove('.volars')
	await fs.copy(definitions, '.volars', { dereference: true })
	await fs.writeFile(
		'.volars/tsconfig.json',
		JSON.stringify(tsConfig, null, '\t')
	)
}
