import { loadConfig } from 'c12'

export interface VolarsConfig {
	namespace: string
}

export const loadVolarsConfig = async (): Promise<VolarsConfig> => {
	const { config } = await loadConfig<VolarsConfig>({
		name: 'volars'
	})
	return config
}

export const defineVolarsConfig = (config: VolarsConfig): VolarsConfig => config
