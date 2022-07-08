import fse from 'fs-extra'
import chalk from 'chalk'
import { transformFileSync } from '@swc/core'
import { basename, dirname, resolve } from 'pathe'
import { resolve as metaResolve } from 'mlly'
import { pathToFileURL } from 'url'
import { cacheDir } from '../constants'
import { changeExt, getHash } from './utils'
import { logger } from '../logger'

export async function loadModule(path: string, hmr = false): Promise<any> {
	try {
		const cachePath = resolve(cacheDir, changeExt(path, '.js'))

		if (hmr) {
			const file = transformFileSync(resolve(path))
			const hashedPath = resolve(
				dirname(cachePath),
				`${getHash(file.code)}-${basename(cachePath)}`
			)

			fse.writeFileSync(
				cachePath,
				await resolveImports(file.code, {
					url: cachePath
				})
			)
			fse.copyFileSync(cachePath, hashedPath)

			const content = await import(pathToFileURL(hashedPath).href)
			fse.removeSync(hashedPath)

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
			let url = ''

			try {
				url = await metaResolve(`${id}.js`, {
					conditions: ['import'],
					url: options.url
				})
			} catch {
				url = await metaResolve(id, {
					conditions: ['node'],
					url: options.url
				})
			} finally {
				if (!url) {
					logger.error(
						`Could not resolve import ${chalk.blackBright(
							id
						)} in ${chalk.blackBright(options.url)}`
					)
					process.exit(1)
				}
			}

			resolved.set(id, url)
		})
	)

	const reg = new RegExp(
		uniqueImports.map((index) => `(${index})`).join('|'),
		'g'
	)
	return code.replace(reg, (id) => resolved.get(id)!)
}
