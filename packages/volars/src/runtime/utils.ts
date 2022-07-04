import fs from 'fs-extra'
import jiti from 'jiti'
import { extname } from 'pathe'
import { logger } from '../logger'

export async function prepareDirectory(path: string): Promise<void> {
	await fs.remove(path)
	await fs.mkdir(path)
}

export async function tryImport(path: string): Promise<string> {
	try {
		return await jiti('', { interopDefault: true, requireCache: false })(
			path
		)
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}
}

export async function writeJsonFile(
	path: string,
	contents: string | Record<string, any>
): Promise<void> {
	await fs.outputJSON(changeExtension(path, '.json'), contents, {
		spaces: '\t'
	})
}

export function changeExtension(path: string, extension: string): string {
	return path.replace(extname(path), extension)
}
