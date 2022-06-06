import glob from 'fast-glob'
import { resolve } from 'pathe'
import { createServer, ViteDevServer } from 'vite'
import { ViteNodeRunner } from 'vite-node/client'
import { ViteNodeServer } from 'vite-node/server'
import { loadVolarsConfig, VolarsConfig } from '../config'
import { log } from './console'
import { FileType } from './types'

export class Compiler {
	protected server: ViteDevServer | undefined
	protected node: ViteNodeServer | undefined
	protected runner: ViteNodeRunner | undefined
	protected config: VolarsConfig | undefined

	public async init(): Promise<void> {
		this.server = await createServer({
			optimizeDeps: {
				disabled: true
			}
		})

		this.node = new ViteNodeServer(this.server)

		this.runner = new ViteNodeRunner({
			root: this.server.config.root,
			base: this.server.config.base,

			fetchModule: (id) => this.node!.fetchModule(id),
			resolveId: (id, importer) => this.node!.resolveId(id, importer)
		})

		this.config = await loadVolarsConfig()
	}

	public async build(): Promise<void> {
		log(`is building the project...`)

		const startTime = Date.now()
		const files = this.getBlocks()

		files.forEach(async (file, index, array) => {
			const isLast = index === array.length - 1

			await this.runner?.executeFile(file)

			if (isLast) {
				log(`compiled ${files.length} files in ${Date.now() - startTime}ms`)
				process.exit()
			}
		})
	}

	protected getAboslutePath(path: string): string {
		return resolve(process.cwd(), path)
	}

	protected getFile(path: string, type: FileType): string[] {
		return glob.sync(this.getAboslutePath(`${path}/*.${type}.ts`))
	}

	protected getBlocks(): string[] {
		return this.getFile(`${this.config?.packs?.behaviorPack}/blocks`, 'block')
	}
}
