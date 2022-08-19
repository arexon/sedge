import { deepMerge } from 'collection/deep_merge.ts';
import { resolve, toFileUrl } from 'path';
import { logger } from '../shared/logger.ts';

export interface ConfigPacks {
	behaviorPack: string;
	resourcePack: string;
	worldTemplate: string;
}

export interface Config {
	name: string;
	authors?: string[];
	namespace: string;
	packs: ConfigPacks;
	sedge: {
		targets: {
			[name: string]: string;
		};
		minify: boolean;
		ignorePaths?: string[];
		initialCleanUp: boolean;
		scriptEntryName: string;
		plugins?: string[];
	};
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

	return deepMerge<Required<Config>>(defaults, config);
}
