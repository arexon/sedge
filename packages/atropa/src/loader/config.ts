import fse from 'fs-extra'

export interface Config {
	name: string
	authors?: string[]
	namespace: string
	packs: {
		[key in 'behaviorPack' | 'resourcePack']: string
	}
	atropa?: {
		targets?: {
			[name: string | 'default']: string
		}
		ignorePaths?: string[]
	}
}

export async function loadConfig(): Promise<Config> {
	let config: Config
	const configDefaults: Config = {
		name: 'atropa',
		namespace: 'atropa',
		packs: {
			behaviorPack: './packs/BP',
			resourcePack: './packs/RP'
		}
	}

	try {
		config = (await fse.readJson('./config.json')) as Config
	} catch (_) {
		config = configDefaults
	}

	return { ...config, ...configDefaults }
}
