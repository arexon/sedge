import { deepMerge } from 'collection/deep_merge.ts';
import { Md5 } from 'hash/md5.ts';
import { toFileUrl } from 'path';
import { logger, SEDGE_NAMESPACE } from '../shared/mod.ts';
import { CacheRecord } from './cache.ts';
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
		ignorePaths?: string[];
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
	cache: CacheRecord;
	hash: string;
}

export async function loadModule(
	path: string,
	options: LoadModuleOptions,
): Promise<any> {
	const { config, fs, cache, hash } = options;

	if (hash === cache[path]) return undefined;

	let result = await fs.import(`${toFileUrl(path).href}?hash=${hash}`);
	result = applyConfig(result.default, config);

	return result;
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

export function invalidateCache(path: string, fs: SedgeFileSystem): string {
	const source = fs.readTextFileSync(path);

	return new Md5().update(
		typeof source === 'object' ? JSON.stringify(source) : source,
	).toString();
}
