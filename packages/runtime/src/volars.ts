import consola, { type Consola } from 'consola'
import { type Config, loadConfig } from 'volars-config'

export async function createVolars(
	options: VolarsInstanceOptions
): Promise<VolarsInstance> {
	const config = await loadConfig()

	const volars: VolarsInstance = {
		config,
		target: options.dev ? 'dev' : 'build',
		logger: consola.withTag('volars'),
		dev: options.dev
	}

	return volars
}

export interface VolarsInstance {
	config: Config
	target: string
	logger: Consola
	dev: boolean
}

interface VolarsInstanceOptions {
	target?: string
	dev: boolean
}
