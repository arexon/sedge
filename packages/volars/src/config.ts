import fs from 'fs-extra'
import { resolve } from 'pathe'
import type { VolarsConfig } from './types/volars'

export async function loadVolarsConfig(): Promise<VolarsConfig> {
	const path = resolve(process.cwd(), 'config.json')
	const config: VolarsConfig = await fs.readJson(path)

	return config
}
