import { loadConfig, ResolvedConfig } from 'c12'

interface VolarsConfig {
	namespace: string
}

export const loadVolarsConfig = (): Promise<ResolvedConfig<VolarsConfig>> => {
	return loadConfig<VolarsConfig>({
		name: 'volars'
	})
}

export const defineVolarsConfig = (config: VolarsConfig): VolarsConfig => config
