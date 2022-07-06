import fs from 'fs-extra'
import { pathToFileURL } from 'url'
import { transformFileSync } from '@swc/core'
import { dirname, extname, basename, resolve, normalize } from 'pathe'
import {
	resolve as urlResolve,
	transformModule,
	loadURL,
	toDataURL
} from 'mlly'
import { logger } from '../logger'
import { cacheDir } from '../constants'

export async function prepareDir(path: string): Promise<void> {
	await fs.remove(path)
	await fs.mkdir(path)
}

export function writeJsonFile(
	path: string,
	contents: string | Record<string, any>
): void {
	fs.outputJSONSync(changeExt(path, '.json'), contents, {
		spaces: '\t'
	})
}

export function changeExt(path: string, extension: string): string {
	return path.replace(extname(path), extension)
}

export async function loadModule(path: string, hmr = false): Promise<any> {
	try {
		const cachePath = resolve(cacheDir, changeExt(path, '.js'))

		if (hmr) {
			const hashedPath = resolve(
				dirname(cachePath),
				`${hash()}-${basename(cachePath)}`
			)
			const file = transformFileSync(resolve(path))

			fs.writeFileSync(
				cachePath,
				await resolveImports(file.code, {
					url: cachePath
				})
			)
			fs.copyFileSync(cachePath, hashedPath)

			const content = await import(pathToFileURL(hashedPath).href)
			fs.removeSync(hashedPath)

			return content.default
		} else {
			return (await import(pathToFileURL(cachePath).href)).default
		}
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}
}

export async function resolveImports(
	code: string,
	options: { url: string }
): Promise<string> {
	const evalEsmImportReg =
		/(?<=import .* from ['"])([^'"]+)(?=['"])|(?<=export .* from ['"])([^'"]+)(?=['"])|(?<=import\s*['"])([^'"]+)(?=['"])|(?<=import\s*\(['"])([^'"]+)(?=['"]\))/g

	const imports = Array.from(code.matchAll(evalEsmImportReg)).map(
		(module) => module[0]
	)
	if (!imports.length) return code

	const uniqueImports = Array.from(new Set(imports))
	const resolved = new Map<string, string>()

	await Promise.all(
		uniqueImports.map(async (id) => {
			let url: string

			if (id.startsWith('#')) {
				const aliasImport = id.split('/').shift()!
				url = pathToFileURL(
					id.replace(
						aliasImport,
						resolve(
							cacheDir,
							global.config.packs.behaviorPack,
							aliasImport.replace('#', '')
						)
					) + '.js'
				).href
			} else {
				url = await urlResolve(id, options)
			}
			if (url.endsWith('.json')) {
				const code = await loadURL(url)
				url = toDataURL(await transformModule(code, { url }))
			}

			resolved.set(id, normalize(url))
		})
	)

	const reg = new RegExp(
		uniqueImports.map((index) => `(${index})`).join('|'),
		'g'
	)
	return code.replace(reg, (id) => resolved.get(id)!)
}

function hash(): string {
	return Math.random().toString(36).substring(2, 15)
}
