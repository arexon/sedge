import fs from 'fs-extra'
import chalk from 'chalk'
import { globby } from 'globby'
import { debounce } from '@antfu/utils'
import { watch as chokidarWatch } from 'chokidar'
import { join, normalize, resolve, extname } from 'pathe'
import { logger } from '../logger'
import { changeExtension, tryImport, writeJsonFile } from './utils'

export async function build(silent = false): Promise<void> {
	const start = Date.now()

	const modules = await globby(
		join(global.config.packs.behaviorPack, '*/*.ts'),
		{ ignore: ['**/components/**'] }
	)
	const assets = await globby(
		join(global.config.packs.behaviorPack, '**/*'),
		{ ignore: ['**/*.ts'] }
	)

	const results = await Promise.allSettled([
		...modules.map(async (path) => {
			const content = await tryImport(resolve(path))
			await writeJsonFile(resolve(global.target.path, path), content)
		}),
		...assets.map(async (path) => {
			await fs.copy(path, resolve(global.target.path, path))
		})
	])

	if (silent) return

	const successResults = results.filter(
		(result) => result.status === 'fulfilled'
	)
	logger.success(
		`Compiled ${successResults.length} files in ${Date.now() - start} ms`
	)
}

export async function watch(): Promise<void> {
	await build(true)

	let filesQueue: {
		updated?: string[]
		removed?: string[]
	} = { updated: [], removed: [] }

	const reload = debounce(200, () => {
		console.clear()

		filesQueue.updated?.map(async (path) => {
			// Reload if the file is in the components folder
			if (path.includes('/components/')) {
				logReload()
				return await build(true)
			}

			// Guard for whether the file is a module or an asset
			if (extname(path) === '.ts') {
				const content = await tryImport(resolve(path))
				await writeJsonFile(resolve(global.target.path, path), content)
			} else {
				await fs.copy(path, resolve(global.target.path, path))
			}
		})

		filesQueue.removed?.map(async (path) => {
			// Reload if the file is in the components folder
			if (path.includes('/components/')) {
				logReload()
				return await build(true)
			}

			await fs.remove(
				resolve(
					global.target.path,
					// Guard to ensure that TS files compiled to JSON will be removed
					extname(path) === '.ts'
						? changeExtension(path, '.json')
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
