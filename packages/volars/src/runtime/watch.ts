import fs from 'fs-extra'
import chalk from 'chalk'
import { normalize, resolve } from 'pathe'
import { watch as chokidarWatch } from 'chokidar'
import { debounce } from 'perfect-debounce'
import { logger } from '../logger'
import { build } from './build'
import { writeJsonFile, tryImport, replaceFileExtension } from './utils'

export async function watch(): Promise<void> {
	await build()

	let filesQueue: {
		updated?: string[]
		removed?: string[]
	} = { updated: [], removed: [] }

	const reload = debounce(async () => {
		filesQueue.updated?.map(async (path) => {
			if (path.endsWith('.ts')) {
				const content = await tryImport(resolve(path))
				await writeJsonFile(resolve(global.target.path, path), content)
			} else {
				await fs.copy(path, resolve(global.target.path, path))
			}
		})

		filesQueue.removed?.map(async (path) => {
			await fs.remove(
				resolve(
					global.target.path,
					path.endsWith('.ts')
						? replaceFileExtension(path, '.json')
						: path
				)
			)
		})

		console.clear()
		logFilesQueue(filesQueue.updated ?? [], 'updated')
		logFilesQueue(filesQueue.removed ?? [], 'removed')

		filesQueue = { updated: [], removed: [] }
	}, 100)

	const watcher = chokidarWatch(global.config.packs.behaviorPack, {
		ignoreInitial: true
	})

	watcher.on('all', async (event, path) => {
		switch (event) {
			case 'add':
			case 'change':
				if (filesQueue.updated?.includes(path)) break
				filesQueue.updated?.push(normalize(path))
				break

			case 'unlink':
				if (filesQueue.removed?.includes(path)) break
				filesQueue.removed?.push(normalize(path))
		}

		reload()
	})
}

function logFilesQueue(queue: string[], level: 'updated' | 'removed'): void {
	if (queue.length === 0) return

	logger.info(
		level === 'updated' ? chalk.cyan('Updated') : chalk.magenta('Removed'),
		queue
			.map((path) => {
				return chalk.blackBright(`\n- ${path}`)
			})
			.join('')
			.toString()
	)
}
