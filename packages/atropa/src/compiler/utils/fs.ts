import fse from 'fs-extra'

export async function prepareFolder(path: string): Promise<void> {
	await fse.remove(path)
	await fse.mkdir(path)
}
