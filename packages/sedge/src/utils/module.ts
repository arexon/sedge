import { pathToFileURL } from 'url'
import { normalize } from 'pathe'
import { resolvePath } from 'mlly'
import { blue } from 'colorette'

type CreateAtropa = (options: {
	target: string
	mode: 'build' | 'dev'
}) => Promise<void>

export async function importAtropa(): Promise<Record<string, CreateAtropa>> {
	try {
		const resolvedPath = normalize(await resolvePath('atropa/compiler'))
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
