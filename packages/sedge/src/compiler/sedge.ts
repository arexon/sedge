import { hasOwnProperty } from '@antfu/utils'
import { blackBright, blue, green, magenta, yellow } from 'colorette'
import { join, resolve } from 'pathe'
import type { TSConfig } from 'pkg-types'
import { logger } from '../logger'
import { loadConfig } from './config'
import { comMojangDir, tempDir } from './constants'
import { prepareDir, writeJsonFile } from './fs'
import { build, dev } from './modes'
import { evalModule } from './module'
import { getComMojangPathByPack } from './path'
import { pluginHooks } from './plugin'

export type SedgeModes = 'build' | 'dev' | 'dev+websocket'

export async function createSedge(options: {
	mode: SedgeModes
	target: string
}): Promise<void> {
	try {
		global.sedge = {
			config: await loadConfig(),
			mode: options.mode,
			target: {
				name: options.target,
				path: ''
			},
			isComMojang: false
		}
		const modeIsDev = sedge.mode !== 'build'
		const targetIsDefault = sedge.target.name === 'default'
		const defaultTargetPath =
			modeIsDev && targetIsDefault
				? comMojangDir
				: sedge.config.sedge.targets.default

		if (defaultTargetPath === comMojangDir && modeIsDev) {
			sedge.isComMojang = true
		} else if (defaultTargetPath === null && modeIsDev) {
			throw new Error(
				[
					`Could not find ${blue('com.mojang')} directory`,
					`Please set the ${blue(
						'LOCALAPPDATA'
					)} environment variable, or ensure that Minecraft is properly installed`
				].join('\n')
			)
		}

		const targetIsConfigured = hasOwnProperty(
			sedge.config.sedge.targets,
			sedge.target.name
		)

		if (sedge.isComMojang) {
			sedge.target.path = defaultTargetPath!
		} else {
			sedge.target.path = sedge.config.sedge.targets[sedge.target.name]
		}

		if (targetIsConfigured || targetIsDefault) {
			await runWithMode()
		} else {
			throw new Error(
				`Target ${yellow(
					options.target
				)} does not match any target in ${blackBright(
					'config.sedge.targets'
				)}`
			)
		}
	} catch (error) {
		logger.error(error)
		process.exit(1)
	}
}

async function runWithMode(): Promise<void> {
	logger.info(
		`Via target ${magenta(sedge.target.name)} @ ${blackBright(
			sedge.target.path
		)}`
	)

	generateTypes()
	await prepare()
	await loadPlugins()
	await pluginHooks.callHook('buildStart')

	switch (sedge.mode) {
		case 'build':
			await build()
			break
		case 'dev':
			await dev()
			break
		case 'dev+websocket':
			await dev({ enableWebSocket: true })
	}
}

async function prepare(): Promise<void> {
	if (!sedge.config.sedge.initialCleanUp) return

	if (sedge.isComMojang) {
		await prepareDir(getComMojangPathByPack('BP'))
		await prepareDir(getComMojangPathByPack('RP'))
	} else {
		await prepareDir(sedge.target.path)
	}
}

async function loadPlugins(): Promise<void> {
	const plugins = sedge.config.sedge.plugins

	if (!plugins) return

	for (const plugin of plugins) {
		await evalModule(resolve('plugins', plugin))
	}

	const results = await Promise.allSettled(
		plugins.map(async (plugin) => {
			await evalModule(resolve('plugins', plugin))
		})
	)
	const amount = results.filter(
		(result) => result.status === 'fulfilled'
	).length

	if (!amount) return
	logger.success(green(`Loaded ${amount} plugin${amount === 1 ? '' : 's'}`))
}

function generateTypes(): void {
	const tsConfig: TSConfig = {
		compilerOptions: {
			target: 'esnext',
			module: 'esnext',
			lib: ['esnext'],
			moduleResolution: 'node',
			esModuleInterop: true,
			strict: true
		},
		include: ['../**/*']
	}
	writeJsonFile(join(tempDir, 'tsconfig.json'), tsConfig)
}
