import fs from 'fs-extra'
import { resolve } from 'pathe'

export async function loadConfig(): Promise<Config> {
	const path = resolve(process.cwd(), 'config.json')
	const config: Config = await fs.readJson(path)

	return config
}

export type Packs = { [packType in PackType]: string }
export interface Config {
	name: string
	authors: string[]
	namespace: string
	targetVersion: '1.19.0'
	packs: Packs
	volars: VolarsConfig
}

type PackType = 'behaviorPack' | 'resourcePack'
interface VolarsConfig {
	target: string
}
