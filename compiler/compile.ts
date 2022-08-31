import { resolve } from 'path';
import { CacheRecord } from './cache.ts';
import { invalidateCache, loadModule } from './loaders.ts';
import { Sedge } from './mod.ts';
import { getTargetPath } from './path.ts';

interface CompileOptions {
	sedge: Sedge;
	cache: CacheRecord;
	path: string;
	cacheHit?: Promise<string>;
	cacheMiss?: Promise<string>;
	updateCache(hash: string): void;
}

export async function compileModule(
	options: CompileOptions,
): Promise<string | undefined> {
	const { sedge, cache, path, cacheHit, cacheMiss, updateCache } = options;
	const hash = invalidateCache(resolve(path), sedge.fs);
	const result = await loadModule(resolve(path), {
		config: sedge.config,
		fs: sedge.fs,
		cache,
		hash,
	});

	updateCache(hash);
	if (result === undefined) return cacheHit;

	sedge.fs.outputModule(resolve(getTargetPath(path, sedge)), result);

	return cacheMiss;
}

export function compileAsset(options: CompileOptions) {
	const { sedge, cache, path, cacheHit, cacheMiss, updateCache } = options;
	const hash = invalidateCache(resolve(path), sedge.fs);

	if (hash === cache[resolve(path)]) return cacheHit;
	updateCache(hash);

	sedge.fs.copyFileSync(path, resolve(getTargetPath(path, sedge)));

	return cacheMiss;
}
