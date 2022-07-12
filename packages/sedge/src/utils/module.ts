import { pathToFileURL } from 'url'
import { normalize } from 'pathe'
import { resolvePath } from 'mlly'
import { blue } from 'colorette'

type CreateAtropa = (options: {
	target: string
	mode: 'build' | 'dev'
}) => Promise<void>

interface Config {
	name: string
	authors?: string[]
	namespace: string
	packs: {
		[key in 'behaviorPack' | 'resourcePack']: string
	}
	atropa?: {
		targets?: {
			[name: string | 'default']: string
		}
	}
}

type LoadConfig = () => Promise<Config>

export async function importAtropa(): Promise<{
	createAtropa: CreateAtropa
	loadConfig: LoadConfig
}> {
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
