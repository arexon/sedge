import { resolve } from 'path';
import { CacheRecord, invalidateCache } from './cache.ts';
import { loadModule } from './loaders.ts';
import { Sedge } from './mod.ts';
import { getTargetPath } from './path.ts';

interface CompileOptions {
	sedge: Sedge;
	path: string;
	cache: CacheRecord;
	updateCache(hash: string): void;
}

export async function compileModule(
	options: CompileOptions,
): Promise<string> {
	const { sedge, path, cache, updateCache } = options;
	const hash = invalidateCache(resolve(path), sedge.fs);
	const result = await loadModule(resolve(path), {
		config: sedge.config,
		fs: sedge.fs,
		cache,
		hash,
	});

	updateCache(hash);
	if (result === undefined) return Promise.resolve('cacheHit');

	sedge.fs.outputModule(resolve(getTargetPath(path, sedge)), result);

	return Promise.resolve('cacheMiss');
}

export function compileAsset(
	options: CompileOptions,
): Promise<string> {
	const { sedge, path, cache, updateCache } = options;
	const hash = invalidateCache(resolve(path), sedge.fs);

	if (hash === cache[resolve(path)]) return Promise.resolve('cacheHit');
	updateCache(hash);

	sedge.fs.copyFileSync(path, resolve(getTargetPath(path, sedge)));

	return Promise.resolve('cacheMiss');
}
