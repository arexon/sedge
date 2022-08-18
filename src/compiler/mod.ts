import { deepMerge } from 'collection/deep_merge.ts';
import { resolve, toFileUrl } from 'path';

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
		console.error(error);
	}
}

export async function loadConfig(): Promise<Config> {
	const config: Config = (await import(
		toFileUrl(resolve('config.json')).href,
		{ assert: { type: 'json' } }
	)).default;
	const configDefaults: Config = {
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

	return deepMerge(configDefaults, config);
}
