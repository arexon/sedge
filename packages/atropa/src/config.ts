import { deepMerge } from '@antfu/utils'
import { resolve } from 'pathe'

export interface Config {
	name: string
	authors?: string[]
	namespace: string
	packs: {
		[key in 'behaviorPack' | 'resourcePack' | 'worldTemplate']: string
	}
	atropa: {
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
	let config: Config
	const configDefaults: Config = {
		name: 'atropa-project',
		namespace: 'atropa',
		packs: {
			behaviorPack: './packs/BP',
			resourcePack: './packs/RP',
			worldTemplate: './packs/WT'
		},
		atropa: {
			targets: {
				default: './build'
			},
			minify: false,
			initialCleanUp: true,
			scriptEntryName: 'index.ts'
		}
	}

	try {
		config = await import(resolve('./config.json'))
	} catch (_) {
		config = configDefaults
	}

	return deepMerge(configDefaults, config) as Config
}
