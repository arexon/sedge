import { loadConfig } from 'c12'
import type { DeepPartial } from './types/deepPartial'
import type { VolarsConfig } from './types/volars'

export async function loadVolarsConfig(): Promise<VolarsConfig> {
	const { config } = await loadConfig<DeepPartial<VolarsConfig>>({
		name: 'volars',
		defaults: {
			packs: {
				behaviorPack: 'BP',
				resourcePack: 'RP'
			},
			buildDir: 'build'
		}
	})
	return config as VolarsConfig
}

export function defineVolarsConfig(config: VolarsConfig): VolarsConfig {
	return config
}
