import jiti from 'jiti'
import { resolve } from 'pathe'

export async function loadConfig(): Promise<Config> {
	const path = resolve(process.cwd(), 'config.json')
	const config: Config = await jiti('', {
		interopDefault: true
	})(path)

	return config
}

type PackType = 'behaviorPack' | 'resourcePack'
export type Packs = { [packType in PackType]: string }

interface VolarsConfig {
	target: string
}
export interface Config {
	name: string
	authors: string[]
	namespace: string
	targetVersion: '1.19.0'
	packs: Packs
	volars: VolarsConfig
}
