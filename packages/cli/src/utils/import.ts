import { blue } from 'colorette'
import { resolvePath } from 'mlly'
import { normalize } from 'pathe'
import { pathToFileURL } from 'url'
import type {
	Config,
	createSedge,
	loadConfig
} from '../../../sedge/src/compiler'

export async function importSedge<Submodule extends 'compiler'>(
	submodule: Submodule
): Promise<{
	createSedge: typeof createSedge
	loadConfig: typeof loadConfig
}> {
	try {
		const resolvedPath = normalize(await resolvePath(`sedge/${submodule}`))
		return import(pathToFileURL(resolvedPath).href)
	} catch (error) {
		throw new Error(
			`This command requires the ${blue(
				'sedge'
			)} package to be installed in your project`,
			{ cause: error as Error }
		)
	}
}
export type { Config }
