import { resolve, toFileUrl } from 'path';
import { logger, SEDGE_CACHE_FILE } from '../shared/mod.ts';
import { SedgeFileSystem, sedgeFileSystem } from './fs.ts';
import { Config, loadConfig } from './loaders.ts';
import { build } from './modes.ts';
import { findMojangDir } from './path.ts';

export type SedgeMode = 'build' | 'dev' | 'devWebSocket';
export interface SedgeTarget {
	name: string;
	path: string;
	isMojangDir: boolean;
}
export interface Sedge {
	config: Config;
	mode: SedgeMode;
	target: SedgeTarget;
	fs: SedgeFileSystem;
}

export async function startSedge(options: {
	mode: SedgeMode;
	target: string;
}): Promise<void> {
	const config = await loadConfig(resolve('config.json'), sedgeFileSystem);
	const sedge: Sedge = {
		config,
		mode: options.mode,
		target: {
			name: options.target,
			path: config.sedge.targets[options.target] || '',
			isMojangDir: false,
		},
		fs: sedgeFileSystem,
	};

	const modeIsDev = sedge.mode !== 'build';
	const targetIsDefault = sedge.target.name === 'default';

	// We don't want to set `com.mojang` options if not needed
	if (targetIsDefault && modeIsDev) {
		sedge.target.path = findMojangDir(sedge.fs);
		sedge.target.isMojangDir = true;
	}

	const targetIsConfigured = Object.hasOwn(
		sedge.config.sedge.targets,
		sedge.target.name,
	);
	if (targetIsConfigured || targetIsDefault) await startMode(sedge);
	else {
		logger.error(
			`Target [${options.target}] does not match any configured target in [config.sedge.targets]`,
		);
		Deno.exit(1);
	}
}

async function startMode(sedge: Sedge): Promise<void> {
	logger.info(`Via target [${sedge.target.name}] at (${sedge.target.path})`);

	let cache: Record<string, string> = {};
	if (sedge.config.sedge.cache) cache = await loadCacheData(sedge.fs);

	if (sedge.mode === 'build') await build(sedge, cache);
	if (sedge.mode === 'dev') console.log('Dev mode');
	if (sedge.mode === 'devWebSocket') console.log('Dev WebSocket mode');

	if (sedge.config.sedge.cache) saveCacheData(sedge.fs, cache);
}

async function loadCacheData(
	fs: SedgeFileSystem,
): Promise<Record<string, string>> {
	const cachePath = resolve(SEDGE_CACHE_FILE);

	try {
		return (await fs.import(toFileUrl(cachePath).href, 'json')).default;
	} catch (_) {
		fs.outputJsonFileSync(cachePath, {});
		return {};
	}
}

function saveCacheData(
	fs: SedgeFileSystem,
	cache: Record<string, string>,
): void {
	fs.outputJsonFileSync(
		resolve(SEDGE_CACHE_FILE),
		cache,
	);
}
