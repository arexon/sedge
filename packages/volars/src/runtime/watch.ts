import fs from 'fs-extra'
import chalk from 'chalk'
import { normalize, resolve } from 'pathe'
import { watch as chokidarWatch } from 'chokidar'
import { debounce } from '@antfu/utils'
import { logger } from '../logger'
import { build } from './build'
import { writeJsonFile, tryImport, replaceFileExtension } from './utils'

export async function watch(): Promise<void> {
	await build(true)

	let filesQueue: {
		updated?: string[]
		removed?: string[]
	} = { updated: [], removed: [] }

	const reload = debounce(200, () => {
		console.clear()

		filesQueue.updated?.map(async (path) => {
			if (path.includes('/components/')) {
				logReload()
				return await build(true)
			}
			if (path.endsWith('.ts')) {
				const content = await tryImport(resolve(path))
				await writeJsonFile(resolve(global.target.path, path), content)
			} else {
				await fs.copy(path, resolve(global.target.path, path))
			}
		})

		filesQueue.removed?.map(async (path) => {
			if (path.includes('/components/')) {
				logReload()
				return await build(true)
			}
			await fs.remove(
				resolve(
					global.target.path,
					// Ensure that '.ts' files won't be written as is
					path.endsWith('.ts')
						? replaceFileExtension(path, '.json')
						: path
				)
			)
		})

		logFilesQueue(filesQueue.updated ?? [], 'Updated')
		logFilesQueue(filesQueue.removed ?? [], 'Removed')

		filesQueue = { updated: [], removed: [] }
	})

	const watcher = chokidarWatch(global.config.packs.behaviorPack, {
		ignoreInitial: true
	})

	watcher.on('all', (event, path) => {
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

function logFilesQueue(queue: string[], level: 'Updated' | 'Removed'): void {
	if (queue.length === 0) return

	logger.info(
		level === 'Updated' ? chalk.cyan(level) : chalk.magenta(level),
		queue
			.map((path) => {
				return chalk.blackBright(`\n- ${path}`)
			})
			.join('')
			.toString()
	)
}

function logReload(): void {
	logger.info(
		'Changes in',
		chalk.cyan('components'),
		'folder were detected. Reloading...'
	)
}
