import { filterEntries } from 'collection/filter_entries.ts';
import { WalkEntry } from 'fs';
import { Md5 } from 'hash/md5.ts';
import { join, resolve } from 'path';
import { SedgeFileSystem } from './fs.ts';

export type CacheRecord = Record<string, string>;

export function loadCache(file: string, fs: SedgeFileSystem): CacheRecord {
	const path = join('.sedge', file);
	try {
		return fs.readJsonFileSync(path);
	} catch {
		fs.outputJsonFileSync(path, {});
		return {};
	}
}

export function saveCache(
	file: string,
	cache: CacheRecord,
	fs: SedgeFileSystem,
): void {
	fs.outputJsonFileSync(
		join('.sedge', file),
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

export function invalidateCache(source: string): string {
	return new Md5().update(
		typeof source === 'object' ? JSON.stringify(source) : source,
	).toString();
}
