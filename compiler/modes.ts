import { debounce } from 'async';
import { extname, resolve } from 'path';
import { logger } from '../shared/mod.ts';
import { filterUnusedCache, loadCache, saveCache } from './cache.ts';
import { invalidateCache, loadModule } from './loaders.ts';
import { Sedge } from './mod.ts';
import { findPathsInPacks, getTargetPath, toRelative } from './path.ts';

export async function build(sedge: Sedge): Promise<void> {
	const startTime = Date.now();
	const { assets, modules } = findPathsInPacks({
		packs: sedge.config.packs,
		ignorePaths: sedge.config.sedge.ignorePaths,
	});

	if (assets.length === 0 && modules.length === 0) return;

	const oldCache = loadCache(sedge.fs);
	const newCache = filterUnusedCache(oldCache, [...assets, ...modules]);

	const results = await Promise.allSettled([
		...modules.map(async ({ path }) => {
			const hash = invalidateCache(resolve(path), sedge.fs);
			const result = await loadModule(resolve(path), {
				config: sedge.config,
				fs: sedge.fs,
				cache: oldCache,
				hash,
			});

			if (sedge.config.sedge.cache) newCache[resolve(path)] = hash;
			if (result === undefined) return Promise.resolve('cacheHit');

			sedge.fs.outputModule(resolve(getTargetPath(path, sedge)), result);

			return Promise.resolve('cacheMiss');
		}),
		...assets.map(({ path }) => {
			if (sedge.config.sedge.cache) {
				const hash = invalidateCache(resolve(path), sedge.fs);
				newCache[resolve(path)] = hash;

				if (hash === oldCache[resolve(path)]) {
					return Promise.resolve('cacheHit');
				}
			}

			sedge.fs.copyFileSync(path, resolve(getTargetPath(path, sedge)));

			return Promise.resolve('cacheMiss');
		}),
		// TODO: compile scripts
	]);

	saveCache(newCache, sedge.fs);
	logCompilationInfo(results, startTime);
}

export async function dev(
	sedge: Sedge,
): Promise<void> {
	const filesToUpdate = new Set<string>();
	const filesToRemove = new Set<string>();

	const applyChanges = async () => {
		if (filesToUpdate.size === 0 && filesToRemove.size === 0) return;

		logger.clear();

		const oldCache = loadCache(sedge.fs);
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
					const hash = invalidateCache(resolve(path), sedge.fs);
					const result = await loadModule(resolve(path), {
						config: sedge.config,
						fs: sedge.fs,
						cache: oldCache,
						hash,
					});

					if (sedge.config.sedge.cache) {
						newCache[resolve(path)] = hash;
					}
					if (result === undefined) return;

					sedge.fs.outputModule(
						resolve(getTargetPath(path, sedge)),
						result,
					);
				} else {
					if (sedge.config.sedge.cache) {
						const hash = invalidateCache(resolve(path), sedge.fs);
						newCache[resolve(path)] = hash;

						if (hash === oldCache[resolve(path)]) return;
					}

					sedge.fs.outputTextFileSync(
						resolve(getTargetPath(path, sedge)),
						source,
					);
				}
			}),
			...[...filesToRemove].map((path) => {
				try {
					sedge.fs.lstatSync(resolve(getTargetPath(path, sedge)));
				} catch {
					filesToRemove.delete(path);
				}

				sedge.fs.removeSync(resolve(getTargetPath(path, sedge)));
			}),
		]);

		logChangesInfo([...filesToUpdate], 'update');
		logChangesInfo([...filesToRemove], 'remove');
		filesToUpdate.clear();
		filesToRemove.clear();
		saveCache(newCache, sedge.fs);
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
	let cacheHits = 0;
	let cacheMisses = 0;
	for (const result of results) {
		if (result.status === 'fulfilled') {
			if (result.value === 'cacheHit') cacheHits++;
			else if (result.value === 'cacheMiss') cacheMisses++;
		}
	}

	let cacheStatus = '';
	if (cacheMisses === 0) cacheStatus = '(>>>) [FULL TURBO]';
	else if (cacheMisses > 0 && cacheHits > 0) {
		cacheStatus = `(>>>) [${cacheHits}] cache hits`;
	}

	logger.success(
		`Compiled [${cacheHits + cacheMisses}] files in ${
			Date.now() - startTime
		} ms`,
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
