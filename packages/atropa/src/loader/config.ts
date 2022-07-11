import { loadConfig as createLoadConfig } from 'c12'

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
	}
}

export async function loadConfig(): Promise<Config> {
	const defaults: Config = {
		name: 'atropa',
		namespace: 'atropa',
		packs: {
			behaviorPack: './packs/BP',
			resourcePack: './packs/RP'
		}
	}
	const { config } = await createLoadConfig<Config>({
		defaults
	})

	if (!config) return defaults

	return config
}
