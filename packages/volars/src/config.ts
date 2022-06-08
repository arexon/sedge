import { loadConfig } from 'c12'
import type { VolarsConfig } from './types/volars'

export async function loadVolarsConfig(): Promise<VolarsConfig> {
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
			},
			buildDir: 'build'
		}
	})
	return config
}

export function defineVolarsConfig(config: VolarsConfig): VolarsConfig {
	return config
}
