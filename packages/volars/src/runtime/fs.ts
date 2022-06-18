import fs from 'fs-extra'

export async function prepareDir(dir: string): Promise<void> {
	await fs.mkdir(dir, { recursive: true })
	await fs.emptyDir(dir)
}
