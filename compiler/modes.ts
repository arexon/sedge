import { debounce } from 'async';
import { extname, resolve } from 'path';
import { logger } from '../shared/mod.ts';
import { filterUnusedCache, loadCache, saveCache } from './cache.ts';
import { compileAsset, compileModule } from './compile.ts';
import { Sedge } from './mod.ts';
import { findPathsInPacks, getTargetPath, toRelative } from './path.ts';

export async function build(sedge: Sedge): Promise<void> {
	const startTime = Date.now();
	const { assets, modules } = findPathsInPacks({
		packs: sedge.config.packs,
		ignorePaths: sedge.config.sedge.ignorePaths,
	});

	if (assets.length === 0 && modules.length === 0) return;

	const cacheFile = `${sedge.target.name}_cache.json`;
	const oldCache = loadCache(cacheFile, sedge.fs);
	const newCache = filterUnusedCache(oldCache, [...assets, ...modules]);

	const results = await Promise.allSettled([
		...modules.map(async ({ path }) => {
			return await compileModule({
				path,
				sedge,
				cache: newCache,
				cacheHit: Promise.resolve('cacheHit'),
				cacheMiss: Promise.resolve('cacheMiss'),
				updateCache: (hash) => newCache[resolve(path)] = hash,
			});
		}),
		...assets.map(({ path }) => {
			return compileAsset({
				path,
				sedge,
				cache: newCache,
				cacheHit: Promise.resolve('cacheHit'),
				cacheMiss: Promise.resolve('cacheMiss'),
				updateCache: (hash) => newCache[resolve(path)] = hash,
			});
		}),
		// TODO: compile scripts
	]);

	saveCache(cacheFile, newCache, sedge.fs);
	logCompilationInfo(results, startTime);
}

export async function dev(sedge: Sedge): Promise<void> {
	const filesToUpdate = new Set<string>();
	const filesToRemove = new Set<string>();

	const applyChanges = async () => {
		if (filesToUpdate.size === 0 && filesToRemove.size === 0) return;

		logger.clear();

		const cacheFile = `${sedge.target.name}_cache.json`;
		const oldCache = loadCache(cacheFile, sedge.fs);
		const newCache = { ...oldCache };

		await Promise.all([
			...[...filesToUpdate].map(async (path) => {
				const source = sedge.fs.readTextFileSync(path);
				if (!source) {
					logger.info(
						`Skipping over updating an empty file at (${path})`,
					);
					filesToUpdate.delete(path);
					return;
				}

				if (extname(path) === '.ts') {
					return await compileModule({
						path,
						sedge,
						cache: newCache,
						updateCache: (hash) => newCache[resolve(path)] = hash,
					});
				} else {
					return compileAsset({
						path,
						sedge,
						cache: newCache,
						updateCache: (hash) => newCache[resolve(path)] = hash,
					});
				}
			}),
			...[...filesToRemove].map((path) => {
				sedge.fs.removeSync(resolve(getTargetPath(path, sedge)));
			}),
		]);

		logChangesInfo([...filesToUpdate], 'update');
		logChangesInfo([...filesToRemove], 'remove');
		filesToUpdate.clear();
		filesToRemove.clear();
		saveCache(cacheFile, newCache, sedge.fs);
	};

	const updateFileSets = debounce(async ({ kind, paths }: Deno.FsEvent) => {
		const relativePaths = paths.map((path) => toRelative(path));

		if (paths.length === 2) {
			filesToRemove.add(relativePaths[0]);
			filesToUpdate.delete(relativePaths[0]);
			filesToUpdate.add(relativePaths[1]);
		} else if (kind === 'modify' || kind === 'create') {
			filesToUpdate.add(relativePaths[0]);
		} else if (kind === 'remove') {
			filesToRemove.add(relativePaths[0]);
		}

		await applyChanges();
	}, 200);

	const watcher = Deno.watchFs([
		sedge.config.packs.behaviorPack,
		sedge.config.packs.resourcePack,
	]);

	for await (const { kind, paths } of watcher) {
		if (['access', 'any', 'other'].includes(kind)) continue;

		updateFileSets({ kind, paths });
	}
}

function logCompilationInfo(
	results: PromiseSettledResult<string | void>[],
	startTime: number,
): void {
	const { cacheHits, cacheMisses } = results.reduceRight((prev, result) => {
		if (result.status === 'fulfilled') {
			if (result.value === 'cacheHit') {
				return { ...prev, ...{ cacheHits: 1 + prev.cacheHits } };
			} else if (result.value === 'cacheMiss') {
				return { ...prev, ...{ cacheMisses: 1 + prev.cacheMisses } };
			}
		}
		return prev;
	}, { cacheHits: 0, cacheMisses: 0 });

	const cacheStatus = cacheMisses === 0
		? '(>>>) [FULL TURBO]'
		: cacheMisses > 0 && cacheHits > 0
		? `(>>>) [${cacheHits}] cache hits`
		: '';

	logger.success(
		`Compiled [${cacheHits + cacheMisses}] files in [${
			Date.now() - startTime
		} ms]`,
		cacheStatus,
	);
}

function logChangesInfo(
	paths: string[],
	type: 'update' | 'remove',
): void {
	if (paths.length === 0) return;

	logger.success(
		type === 'update' ? '[Updated]' : '{Removed}',
		`${paths.map((path) => `\n- (${toRelative(path)})`).join('')}`,
	);
}
