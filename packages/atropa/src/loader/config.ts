import { deepMerge } from '@antfu/utils'
import { importModule } from '../compiler/utils/module'

export interface Config {
	name: string
	authors?: string[]
	namespace: string
	packs: {
		[key in 'behaviorPack' | 'resourcePack']: string
	}
	atropa: {
		targets: {
			[name: string | 'default']: string
		}
		minify: boolean
		ignorePaths?: string[]
	}
}

export async function loadConfig(): Promise<Config> {
	let config: Config
	const configDefaults: Config = {
		name: 'atropa-project',
		namespace: 'atropa',
		packs: {
			behaviorPack: './packs/BP',
			resourcePack: './packs/RP'
		},
		atropa: {
			targets: {
				default: './build'
			},
			minify: false
		}
	}

	try {
		config = await importModule('./config.json')
	} catch (_) {
		config = configDefaults
	}

	return deepMerge(configDefaults, config) as Config
}
