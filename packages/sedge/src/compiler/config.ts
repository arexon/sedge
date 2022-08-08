import { deepMerge } from '@antfu/utils'
import { evalModule } from './utils'

export interface Config {
	name: string
	authors?: string[]
	namespace: string
	packs: {
		[key in 'behaviorPack' | 'resourcePack' | 'worldTemplate']: string
	}
	sedge: {
		targets: {
			[name: string | 'default']: string
		}
		minify: boolean
		ignorePaths?: string[]
		initialCleanUp: boolean
		scriptEntryName: string
	}
}

export async function loadConfig(): Promise<Config> {
	const config = await evalModule('./config.json')
	const configDefaults: Config = {
		name: 'sedge-project',
		namespace: 'sedge',
		packs: {
			behaviorPack: './packs/BP',
			resourcePack: './packs/RP',
			worldTemplate: './packs/WT'
		},
		sedge: {
			targets: {
				default: './build'
			},
			minify: false,
			initialCleanUp: true,
			scriptEntryName: 'index.ts'
		}
	}

	return deepMerge(configDefaults, config) as Config
}
