import { prepareDir } from '../fs'
import { VolarsInstance } from '../volars'
import { build } from './build'
import { watch } from './watch'
import { createDefinitions } from './definitions'

export async function start(volars: VolarsInstance): Promise<void> {
	await createDefinitions(volars.config.packs)
	await prepareDir(volars.config.volars.target)

	if (volars.dev) {
		volars.logger.start('Watching the project...')

		return await watch(volars)
	} else {
		volars.logger.start('Building the project...')

		return await build(volars)
	}
}
