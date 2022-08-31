import { Loader, transform } from 'esbuild';
import { extname, resolve } from 'path';
import { CacheRecord, invalidateCache } from './cache.ts';
import { loadModule } from './loaders.ts';
import { Sedge } from './mod.ts';
import { getTargetPath, toExtension } from './path.ts';

type CompileResult = Promise<'cacheHit' | 'cacheMiss'>;

interface CompileOptions {
	sedge: Sedge;
	path: string;
	cache: CacheRecord;
	updateCache(hash: string): void;
}

export async function compileModule(
	options: CompileOptions,
): CompileResult {
	const { sedge, path, cache, updateCache } = options;
	const source = sedge.fs.readTextFileSync(path);
	const hash = invalidateCache(source, sedge.config);
	console.log(hash);

	const result = await loadModule(resolve(path), {
		config: sedge.config,
		fs: sedge.fs,
		cache,
		hash,
	});

	updateCache(hash);
	if (result === undefined) return Promise.resolve('cacheHit');

	sedge.fs.outputModule(
		resolve(getTargetPath(path, sedge)),
		result,
		sedge.config.sedge.minify,
	);

	return Promise.resolve('cacheMiss');
}

export function compileAsset(
	options: CompileOptions,
): CompileResult {
	const { sedge, path, cache, updateCache } = options;
	const source = sedge.fs.readTextFileSync(path);
	const hash = invalidateCache(source, sedge.config);

	if (hash === cache[resolve(path)]) return Promise.resolve('cacheHit');
	updateCache(hash);

	sedge.fs.outputAsset(
		resolve(getTargetPath(path, sedge)),
		source,
		sedge.config.sedge.minify,
	);

	return Promise.resolve('cacheMiss');
}

export async function compileScript(
	options: CompileOptions,
): CompileResult {
	const { sedge, path, cache, updateCache } = options;
	const source = sedge.fs.readTextFileSync(path);
	const hash = invalidateCache(source, sedge.config);

	if (hash === cache[resolve(path)]) return Promise.resolve('cacheHit');
	updateCache(hash);

	const loader = extname(path).substring(1) as Loader;
	sedge.fs.outputTextFileSync(
		resolve(toExtension(getTargetPath(path, sedge), '.js')),
		(await transform(source, {
			loader,
			minify: sedge.config.sedge.minify,
		})).code,
	);

	return Promise.resolve('cacheMiss');
}
