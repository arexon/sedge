import consola from 'consola'
import { loadVolarsConfig } from '../config'
import type { DeepPartial } from '../types/deepPartial'
import type { Volars } from '../types/volars'

export async function createVolars(options: DeepPartial<Volars>): Promise<Volars> {
	const config = await loadVolarsConfig()

	const volars: Volars = {
		config,
		logger: consola.withTag('volars') || options.logger,
		dev: false || options.dev!
	}

	return volars
}
