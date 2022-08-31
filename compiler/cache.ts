import { filterEntries } from 'collection/filter_entries.ts';
import { WalkEntry } from 'fs';
import { resolve } from 'path';
import { SEDGE_CACHE_FILE } from '../shared/mod.ts';
import { SedgeFileSystem } from './fs.ts';

export type CacheRecord = Record<string, string>;

export function loadCache(fs: SedgeFileSystem): CacheRecord {
	const cachePath = resolve(SEDGE_CACHE_FILE);

	try {
		return fs.readJsonFileSync(cachePath);
	} catch (_) {
		fs.outputJsonFileSync(cachePath, {});
		return {};
	}
}

export function saveCache(
	cache: CacheRecord,
	fs: SedgeFileSystem,
): void {
	fs.outputJsonFileSync(
		resolve(SEDGE_CACHE_FILE),
		cache,
	);
}

export function filterUnusedCache(
	cache: CacheRecord,
	entries: WalkEntry[] | string[],
): CacheRecord {
	const paths = entries.map((entry) =>
		resolve(typeof entry === 'string' ? entry : entry.path)
	);

	return filterEntries(cache, ([path, _]) => paths.includes(path));
}
