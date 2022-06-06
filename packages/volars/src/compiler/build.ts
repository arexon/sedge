import { createServer } from 'vite'
import { ViteNodeServer } from 'vite-node/server'
import { ViteNodeRunner } from 'vite-node/client'
import { resolve } from 'pathe'
import glob from 'fast-glob'

const getAbsolutePath = (file: string) => resolve(process.cwd(), file)

export const build = async () => {
	const server = await createServer({
		optimizeDeps: {
			disabled: true
		}
	})

	await server.pluginContainer.buildStart({})

	const node = new ViteNodeServer(server)

	const runner = new ViteNodeRunner({
		root: server.config.root,
		base: server.config.base,

		fetchModule(id) {
			return node.fetchModule(id)
		},
		resolveId(id, importer) {
			return node.resolveId(id, importer)
		}
	})

	const files = glob.sync(getAbsolutePath('src/**/*.ts'))
	files.forEach(async (file) => {
		await runner.executeFile(file)
	})

	await server.close()
}
