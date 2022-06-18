import { mkdir, emptyDir } from 'fs-extra'

export async function prepareDir(dir: string): Promise<void> {
	await mkdir(dir, { recursive: true })
	await emptyDir(dir)
}
