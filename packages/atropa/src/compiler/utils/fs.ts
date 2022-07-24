import fse from 'fs-extra'
import { resolve } from 'pathe'
import { isModule, replaceExt, resolveToTargetPath } from './path'

export async function prepareFolder(path: string): Promise<void> {
	await fse.remove(path)
	await fse.mkdir(path)
}

export function writeJsonFileToTarget(path: string, content: any): void {
	const minify = atropa.mode === 'build' && atropa.config.atropa.minify

	fse.outputJSONSync(
		resolveToTargetPath(replaceExt(path, '.json')),
		content,
		minify ? undefined : { spaces: '\t' }
	)
}

export function writeFileToTarget(path: string, content: any): void {
	fse.outputFileSync(resolveToTargetPath(path), content)
}

export function copyFileToTarget(path: string): void {
	fse.copySync(path, resolveToTargetPath(path))
}

export function removeFileFromTarget(path: string): void {
	fse.removeSync(
		resolve(
			atropa.target.path,
			isModule(path)
				? replaceExt(resolveToTargetPath(path), '.json')
				: resolveToTargetPath(path)
		)
	)
}
