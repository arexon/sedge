import { pathToFileURL } from 'url'
import { normalize } from 'pathe'
import { resolvePath } from 'mlly'

type createAtropa = (options: { target: string; dev: boolean }) => Promise<void>

export async function importModule(
	path: string
): Promise<Record<string, createAtropa>> {
	const resolvedPath = await resolveModule(path)
	return import(pathToFileURL(resolvedPath).href)
}

async function resolveModule(path: string): Promise<string> {
	return normalize(await resolvePath(path))
}
