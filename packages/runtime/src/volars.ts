import consola, { type Consola } from 'consola'
import { type Config, loadConfig } from 'volars-config'

export async function createVolars(
	options: DeepPartial<VolarsInstance>
): Promise<VolarsInstance> {
	const config = await loadConfig()

	const volars: VolarsInstance = {
		config,
		logger: consola.withTag('volars') || options.logger,
		dev: false || options.dev!
	}

	return volars
}

export interface VolarsInstance {
	config: Config
	logger: Consola
	dev: boolean
}

type DeepPartial<T> = T extends Record<string, any>
	? { [P in keyof T]?: DeepPartial<T[P]> | T[P] }
	: T
