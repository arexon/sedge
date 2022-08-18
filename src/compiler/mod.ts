import { Config, loadConfig } from '@/compiler/config.ts';
import { build } from '@/compiler/modes.ts';
import { findMojangDir, getMojangDirPack } from '@/compiler/path.ts';
import { logger } from '@/shared/logger.ts';
import { emptyDir } from 'fs';

export type SedgeMode = 'build' | 'dev' | 'dev+websocket';
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

async function runMode(sedge: Sedge): Promise<void> {
	logger.info(`Via target [${sedge.target.name}] at (${sedge.target.path})`);

	await prepareDirs(sedge);

	if (sedge.mode === 'build') await build(sedge);
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
