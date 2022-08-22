import { deepMerge } from 'collection/deep_merge.ts';
import { Md5 } from 'hash/md5.ts';
import { toFileUrl } from 'path';
import { SEDGE_NAMESPACE } from '../core/constants.ts';
import { logger } from '../shared/logger.ts';
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
		minify: boolean;
		ignorePaths?: string[];
		initialCleanUp: boolean;
		scriptEntryName: string;
		plugins?: string[];
	};
}

export async function loadConfig(
	path: string,
	fs: SedgeFileSystem,
): Promise<Config> {
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
		config = (await fs.import(toFileUrl(path).href, 'json')).default;
	} catch (_) {
		logger.warn('No [config.json] found, using defaults');
	}

	return deepMerge<Required<Config>>(defaults, config);
}

interface ModuleOptions {
	config?: Partial<Config>;
	fs: SedgeFileSystem;
}

export async function loadModule(
	path: string,
	options: ModuleOptions,
): Promise<any> {
	const { config, fs } = options;
	const source = fs.readTextFileSync(path);
	const fileUrl = `${toFileUrl(path).href}?hash=${hashModule(source)}`;
	const result = await fs.import(fileUrl);

	return applyConfig(result.default, config!);
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

function hashModule(source: string): string {
	return new Md5().update(JSON.stringify(source)).toString();
}
