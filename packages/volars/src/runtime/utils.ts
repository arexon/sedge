import fse from 'fs-extra'
import { extname } from 'pathe'
import { type BinaryLike, createHash } from 'crypto'

export async function prepareDir(path: string): Promise<void> {
	await fse.remove(path)
	await fse.mkdir(path)
}

export function changeExt(path: string, extension: string): string {
	return path.replace(extname(path), extension)
}

export function getHash(source: BinaryLike): string {
	return createHash('sha256').update(source).digest('hex').slice(0, 8)
}
