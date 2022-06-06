import { loadConfig } from 'c12'

type PackTypes = 'behaviorPack' | 'resourcePack'
export interface VolarsConfig {
	name: string
	authors: string[]
	namespace: string
	targetVersion: '1.19.0'
	packs?: { [packType in PackTypes]: string }
}

export const loadVolarsConfig = async (): Promise<VolarsConfig> => {
	const { config } = await loadConfig<VolarsConfig>({
		name: 'volars',
		defaults: {
			name: '',
			authors: [],
			namespace: '',
			targetVersion: '1.19.0',
			packs: {
				behaviorPack: 'BP',
				resourcePack: 'RP'
			}
		}
	})
	return config
}

export const defineVolarsConfig = (config: VolarsConfig): VolarsConfig => config
