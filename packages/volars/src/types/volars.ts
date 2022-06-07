import type { Consola } from 'consola'

type PackType = 'behaviorPack' | 'resourcePack'
export type Packs = { [packType in PackType]: string }

export interface VolarsConfig {
	name: string
	authors: string[]
	namespace: string
	targetVersion: '1.19.0'
	packs: Packs
}

export interface Volars {
	config: VolarsConfig
	logger: Consola
	dev: boolean
}
