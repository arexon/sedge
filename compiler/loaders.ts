import { deepMerge } from 'collection/deep_merge.ts';
import { toFileUrl } from 'path';
import { logger, SEDGE_NAMESPACE } from '../shared/mod.ts';
import { SedgeFileSystem } from './fs.ts';

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
		ignorePaths: string[];
		minify: boolean;
	};
}

export function loadConfig(
	path: string,
	fs: SedgeFileSystem,
): Config {
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
			ignorePaths: [],
			minify: false,
		},
	};

	try {
		config = fs.readJsonFileSync(path);
	} catch {
		logger.warn('No [config.json] found, using defaults');
	}

	return deepMerge<Required<Config>>(defaults, config);
}

interface LoadModuleOptions {
	config: Partial<Config>;
	fs: SedgeFileSystem;
	hash: string;
}

export async function loadModule(
	path: string,
	options: LoadModuleOptions,
): Promise<any> {
	const { config, fs, hash } = options;
	const result = await fs.import(`${toFileUrl(path).href}?hash=${hash}`);

	return applyConfig(result.default, config);
}

export function applyConfig<Object extends Record<string, any>>(
	object: Object,
	config: Partial<Config>,
): Object {
	if (!config) return object;
	return JSON.parse(
		JSON.stringify(object).replaceAll(
			SEDGE_NAMESPACE,
			config.namespace || '',
		),
	);
}
