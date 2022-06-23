import fs from 'fs-extra'
import { configSchema } from 'volars-config'
import { VolarsInstance } from '../volars'
import { build } from './build'
import { watch } from './watch'
import { prepareDir } from '../fileSystem'

export async function start(volars: VolarsInstance): Promise<void> {
	await prepareDir('.volars')
	await fs.writeFile(
		'.volars/configSchema.json',
		JSON.stringify(configSchema, null, '\t')
	)
	await prepareDir(volars.target)

	if (volars.dev) {
		volars.logger.start('Watching the project...')

		return await watch(volars)
	} else {
		volars.logger.start('Building the project...')

		return await build(volars)
	}
}
