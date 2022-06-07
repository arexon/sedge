import consola from 'consola'
import { loadVolarsConfig } from '../config'
import { Volars } from '../types/volars'

type DeepPartial<T> = T extends Record<string, any>
	? { [P in keyof T]?: DeepPartial<T[P]> | T[P] }
	: T

export async function createVolars(options: DeepPartial<Volars>): Promise<Volars> {
	const config = await loadVolarsConfig()

	const volars: Volars = {
		config,
		logger: consola.withTag('volars') || options.logger,
		dev: false || options.dev!
	}

	return volars
}
