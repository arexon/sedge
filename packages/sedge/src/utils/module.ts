import { pathToFileURL } from 'url'
import { normalize } from 'pathe'
import { resolvePath } from 'mlly'

type CreateAtropa = (options: {
	target: string
	mode: 'build' | 'dev'
}) => Promise<void>

export async function importModule(
	path: string
): Promise<Record<string, CreateAtropa>> {
	const resolvedPath = await resolveModule(path)
	return import(pathToFileURL(resolvedPath).href)
}

async function resolveModule(path: string): Promise<string> {
	return normalize(await resolvePath(path))
}
