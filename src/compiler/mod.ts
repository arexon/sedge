import { findMojangDir, getMojangDirPack } from '@/compiler/path_utils.ts';
import { logger } from '@/logger.ts';
import { deepMerge } from 'std/collection/deep_merge.ts';
import { emptyDir } from 'std/fs';
import { resolve, toFileUrl } from 'std/path';

export type SedgeMode = 'build' | 'dev' | 'dev+websocket';
export type SedgeTarget = {
	name: string;
	path: string;
	isMojangDir: boolean;
};
export type Config = {
	name: string;
	authors?: string[];
	namespace: string;
	packs: {
		[key in 'behaviorPack' | 'resourcePack' | 'worldTemplate']: string;
	};
	sedge: {
		targets: {
			[name: string | 'default']: string;
		};
		minify: boolean;
		ignorePaths?: string[];
		initialCleanUp: boolean;
		scriptEntryName: string;
		plugins?: string[];
	};
};

interface Sedge {
	config: Config;
	mode: SedgeMode;
	target: SedgeTarget;
}

export async function startSedge(options: {
	mode: SedgeMode;
	target: string;
}) {
	const sedge: Sedge = {
		config: await loadConfig(),
		mode: options.mode,
		target: { name: options.target, path: '', isMojangDir: false },
	};
	const modeIsDev = sedge.mode !== 'build';
	const targetIsDefault = sedge.target.name === 'default';
	const mojangDir = findMojangDir();
	const defaultTargetPath = modeIsDev && targetIsDefault
		? mojangDir
		: sedge.config.sedge.targets.default;

	if (defaultTargetPath === mojangDir && modeIsDev) {
		sedge.target.isMojangDir = true;
	}

	const targetIsConfigured = Object.hasOwn(
		sedge.config.sedge.targets,
		sedge.target.name,
	);

	// Fill out the `target` object with the processed path and name
	if (sedge.target.isMojangDir) sedge.target.path = defaultTargetPath;
	else sedge.target.path = sedge.config.sedge.targets[sedge.target.name];

	// If the target is not configured, use the default one. Otherwise, throw an error.
	if (targetIsConfigured || targetIsDefault) runMode(sedge);
	else {
		logger.error(
			`Target [${options.target}] does not match any configured target in [config.sedge.targets]`,
		);
		Deno.exit(1);
	}
}

export async function loadConfig(): Promise<Config> {
	let config: Partial<Config> = {};
	const defaults: Config = {
		name: 'sedge-project',
		namespace: 'sedge',
		packs: {
			behaviorPack: './packs/BP',
			resourcePack: './packs/RP',
			worldTemplate: './packs/WT',
		},
		sedge: {
			targets: { default: './build' },
			minify: false,
			initialCleanUp: true,
			scriptEntryName: 'main.ts',
		},
	};

	try {
		config = (await import(
			toFileUrl(resolve('config.json')).href,
			{ assert: { type: 'json' } }
		)).default;
	} catch (_) {
		logger.warn('No [config.json] found, using defaults');
	}

	return deepMerge(defaults, config);
}

async function runMode(sedge: Sedge): Promise<void> {
	logger.info(`Via target [${sedge.target.name}] at (${sedge.target.path})`);

	await prepareDirs(sedge);

	if (sedge.mode === 'build') console.log('Build mode');
	if (sedge.mode === 'dev') console.log('Dev mode');
	if (sedge.mode === 'dev+websocket') console.log('Dev+Websocket mode');
}

async function prepareDirs(sedge: Sedge): Promise<void> {
	if (!sedge.config.sedge.initialCleanUp) return;

	if (sedge.target.isMojangDir) {
		await emptyDir(
			getMojangDirPack(sedge.config.name, 'BP', sedge.target.path),
		);
		await emptyDir(
			getMojangDirPack(sedge.config.name, 'RP', sedge.target.path),
		);
	} else {
		await emptyDir(sedge.target.path);
	}
}
