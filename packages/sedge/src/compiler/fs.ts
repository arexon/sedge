import fse from 'fs-extra'
import { resolve } from 'pathe'
import { isModule, replaceExt, resolveToTargetPath } from './path'

export async function prepareDir(path: string): Promise<void> {
	await fse.remove(path)
	await fse.mkdirp(path)
}

export function writeJsonFileToTarget(path: string, content: any): void {
	const minify = sedge.mode === 'build' && sedge.config.sedge.minify

	fse.outputJSONSync(
		resolveToTargetPath(replaceExt(path, '.json')),
		content,
		minify ? undefined : { spaces: '\t' }
	)
}

export function writeFileToTarget(
	path: string,
	content: any,
	options?: { extension?: string }
): void {
	fse.outputFileSync(
		resolveToTargetPath(replaceExt(path, options?.extension ?? '')),
		content
	)
}

export function writeJsonFile(path: string, content: any): void {
	fse.outputJSONSync(path, content, { spaces: '\t' })
}

export function copyFileToTarget(path: string): void {
	fse.copySync(path, resolveToTargetPath(path))
}

export function removeFileFromTarget(path: string): void {
	fse.removeSync(
		resolve(
			sedge.target.path,
			isModule(path)
				? replaceExt(resolveToTargetPath(path), '.json')
				: resolveToTargetPath(path)
		)
	)
}

export function readFileFromSource(path: string): any {
	return fse.readFileSync(resolve(path), 'utf8')
}

export function pathExists(path: string): boolean {
	return fse.existsSync(resolve(path))
}
