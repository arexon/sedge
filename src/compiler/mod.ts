import { logger } from '@/logger.ts';
import { deepMerge } from 'collection/deep_merge.ts';
import { resolve } from 'https://deno.land/std@0.152.0/path/win32.ts';
import { toFileUrl } from 'path';

export type CompileMode = 'build' | 'dev' | 'dev+websocket';
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

export async function start(options: {
	mode: CompileMode;
	target: string;
}) {
	try {
		globalThis.sedge = {
			config: await loadConfig(),
		};
	} catch (error) {
		logger.error(error.toString());
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
			targets: {
				default: './build',
			},
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
