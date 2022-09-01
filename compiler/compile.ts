import { Loader, transform } from 'esbuild';
import { extname } from 'path';
import { CacheRecord, invalidateCache } from './cache.ts';
import { loadModule } from './loaders.ts';
import { Sedge } from './mod.ts';
import { getTargetPath, toExtension } from './path.ts';

export const compileModule = createResolver(
	async ({ path, sedge, hash }) => {
		const result = await loadModule(path, {
			config: sedge.config,
			fs: sedge.fs,
			hash,
		});

		sedge.fs.outputModule(
			getTargetPath(path, sedge),
			result,
			sedge.config.sedge.minify,
		);
	},
);

export const compileAsset = createResolver(
	({ path, sedge, source }) => {
		sedge.fs.outputAsset(
			getTargetPath(path, sedge),
			source,
			sedge.config.sedge.minify,
		);
	},
);

export const compileScript = createResolver(
	async ({ path, sedge, source }) => {
		const loader = extname(path).substring(1) as Loader;
		const transformed = await transform(source, {
			loader,
			minify: sedge.config.sedge.minify,
		});

		sedge.fs.outputTextFileSync(
			toExtension(getTargetPath(path, sedge), '.js'),
			transformed.code,
		);
	},
);

type CompileResult = Promise<'cacheHit' | 'cacheMiss'>;
interface CompileOptions {
	sedge: Sedge;
	path: string;
	cache: CacheRecord;
	updateCache(hash: string): void;
}
interface ResolverOptions {
	sedge: Sedge;
	path: string;
	source: string;
	hash: string;
}

function createResolver(
	fn: (options: ResolverOptions) => Promise<void> | void,
): (options: CompileOptions) => CompileResult {
	return async ({ cache, path, sedge, updateCache }) => {
		const source = sedge.fs.readTextFileSync(path);
		const hash = invalidateCache(source, sedge.config);

		if (hash === cache[path]) return Promise.resolve('cacheHit');
		updateCache(hash);

		await Promise.resolve(fn({ sedge, path, source, hash }));

		return Promise.resolve('cacheMiss');
	};
}
