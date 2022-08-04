import { blackBright, blue, magenta, yellow } from 'colorette'
import { join } from 'pathe'
import type { TSConfig } from 'pkg-types'
import { comMojangDir, tempDir } from './constants'
import { build, dev } from './modes'
import {
	getComMojangPathByPack,
	hasOwnProperty,
	loadConfig,
	logger,
	prepareDir,
	writeJsonFile
} from './utils'

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

	await prepare()
	generateTypes()

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
