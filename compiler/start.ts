import { resolve } from 'path';
import { logger } from '../shared/mod.ts';
import { SedgeFileSystem, sedgeFileSystem } from './fs.ts';
import { Config, loadConfig } from './loaders.ts';
import { build, dev } from './modes.ts';
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
	const config = loadConfig(resolve('config.json'), sedgeFileSystem);
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
	if (targetIsConfigured || targetIsDefault) {
		if (sedge.mode === 'build') await build(sedge);
		if (sedge.mode === 'dev') await dev(sedge);
		if (sedge.mode === 'devWebSocket') console.log('Dev WebSocket mode');
	} else {
		logger.error(
			`Target [${options.target}] does not match any configured target in [config.sedge.targets]`,
		);
		Deno.exit(1);
	}
}
