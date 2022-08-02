import { blue } from 'colorette'
import { resolvePath } from 'mlly'
import { normalize } from 'pathe'
import { pathToFileURL } from 'url'
import type { createAtropa } from '../../../sedge/src/compiler'
import type { Config, loadConfig } from '../../../sedge/src/config'

export async function importAtropa<Submodule extends 'compiler' | 'config'>(
	submodule: Submodule
): Promise<
	Submodule extends 'compiler'
		? { createAtropa: typeof createAtropa }
		: Submodule extends 'config'
		? { loadConfig: typeof loadConfig }
		: never
> {
	try {
		const resolvedPath = normalize(await resolvePath(`atropa/${submodule}`))
		return import(pathToFileURL(resolvedPath).href)
	} catch (error) {
		throw new Error(
			`This command requires the ${blue(
				'atropa'
			)} package to be installed in your project`,
			{ cause: error as Error }
		)
	}
}
export type { Config }
