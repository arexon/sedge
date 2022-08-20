import { emptyDir } from 'fs';
import { logger } from '../shared/logger.ts';
import { Config, loadConfig } from './config.ts';
import { build } from './modes.ts';
import { findMojangDir, getMojangDirPack } from './path.ts';

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
}

export async function startSedge(options: {
	mode: SedgeMode;
	target: string;
}) {
	const config = await loadConfig();
	const sedge: Sedge = {
		config,
		mode: options.mode,
		target: {
			name: options.target,
			path: config.sedge.targets[options.target] || '',
			isMojangDir: false,
		},
	};

	const modeIsDev = sedge.mode !== 'build';
	const targetIsDefault = sedge.target.name === 'default';

	// We don't want to set `com.mojang` options if not needed
	if (targetIsDefault && modeIsDev) {
		sedge.target.path = findMojangDir();
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

	await prepareDirs(sedge);

	if (sedge.mode === 'build') await build(sedge);
	if (sedge.mode === 'dev') console.log('Dev mode');
	if (sedge.mode === 'devWebSocket') console.log('Dev WebSocket mode');
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
