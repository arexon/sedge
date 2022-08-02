import { blue } from 'colorette'
import { resolvePath } from 'mlly'
import { normalize } from 'pathe'
import { pathToFileURL } from 'url'
import type { createSedge } from '../../../sedge/src/compiler'
import type { Config, loadConfig } from '../../../sedge/src/config'

export async function importSedge<Submodule extends 'compiler' | 'config'>(
	submodule: Submodule
): Promise<
	Submodule extends 'compiler'
		? { createSedge: typeof createSedge }
		: Submodule extends 'config'
		? { loadConfig: typeof loadConfig }
		: never
> {
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
