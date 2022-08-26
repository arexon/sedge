import { resolve } from 'path';
import { logger } from '../shared/mod.ts';
import { hashFile, loadModule } from './loaders.ts';
import { Sedge } from './mod.ts';
import { findPathsInPacks, getTargetPath } from './path.ts';

export async function build(
	sedge: Sedge,
	cache: Record<string, string>,
): Promise<Record<string, string>> {
	const startTime = Date.now();
	const { assets, modules } = findPathsInPacks({
		packs: sedge.config.packs,
		ignorePaths: sedge.config.sedge.ignorePaths,
	});
	const newCache: Record<string, any> = { ...cache };

	if (assets.length === 0 && modules.length === 0) return {};

	const results = await Promise.allSettled([
		...modules.map(async ({ path }) => {
			const { result, hash } = await loadModule(resolve(path), {
				cache,
				config: sedge.config,
				fs: sedge.fs,
			});

			if (sedge.config.sedge.cache) newCache[resolve(path)] = hash;
			if (result === undefined) return Promise.resolve('cacheHit');

			sedge.fs.outputModule(resolve(getTargetPath(path, sedge)), result);

			return Promise.resolve('cacheMiss');
		}),
		...assets.map(({ path }) => {
			if (sedge.config.sedge.cache) {
				const source = sedge.fs.readTextFileSync(path);
				const hash = hashFile(source);

				newCache[resolve(path)] = hash;

				if (hash === cache[resolve(path)]) {
					console.log(hash === cache[resolve(path)]);
					return Promise.resolve('cacheHit');
				}
			}

			sedge.fs.copyFileSync(path, resolve(getTargetPath(path, sedge)));

			return Promise.resolve('cacheMiss');
		}),
		// TODO: compile scripts
	]);

	if (sedge.mode === 'build') {
		logCompilationInfo(results, startTime, sedge.config.sedge.cache);
	}

	return newCache;
}

function logCompilationInfo(
	results: PromiseSettledResult<string | void>[],
	startTime: number,
	cache: boolean,
): void {
	let cacheHits = 0;
	let cacheMisses = 0;
	for (const result of results) {
		if (result.status === 'fulfilled') {
			if (result.value === 'cacheHit') cacheHits++;
			else if (result.value === 'cacheMiss') cacheMisses++;
		}
	}

	logger.success(
		`Compiled [${cacheHits + cacheMisses}] files in ${
			Date.now() - startTime
		} ms`,
		cache
			? `(|) Cache Hits(:) [${cacheHits}] (|) Cache Misses(:) [${cacheMisses}]`
			: '',
	);
}
