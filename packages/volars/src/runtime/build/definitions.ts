import fs from 'fs-extra'
import type { TSConfig } from 'pkg-types'
import type { Packs } from '../../config'

export async function prepareDefinitions(packs: Packs): Promise<void> {
	const tsConfig: TSConfig = {
		compilerOptions: {
			target: 'esnext',
			module: 'esnext',
			moduleResolution: 'node',
			strict: true,
			esModuleInterop: true
		},
		include: [
			'./*.d.ts',
			`../${packs.resourcePack.replace(/^.\//, '')}`,
			`../${packs.behaviorPack.replace(/^.\//, '')}`
		]
	}

	await fs.remove('.volars')
	await fs.mkdirp('.volars')
	await fs.copy('node_modules/volars/dist/definitions', '.volars', {
		dereference: true
	})
	await fs.writeJson('.volars/tsconfig.json', tsConfig, { spaces: '\t' })
}
