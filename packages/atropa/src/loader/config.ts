import fse from 'fs-extra'
import { deepMerge } from '@antfu/utils'

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
			}
		}
	}

	try {
		config = await fse.readJson('./config.json')
	} catch (_) {
		config = configDefaults
	}

	return deepMerge(configDefaults, config) as Config
}
