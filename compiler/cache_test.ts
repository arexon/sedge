import { WalkEntry } from 'fs';
import { join } from 'path';
import { assertEquals } from 'testing/asserts.ts';
import {
	CacheRecord,
	filterUnusedCache,
	loadCache,
	saveCache,
} from './cache.ts';
import { SedgeFileSystem } from './fs.ts';

// @ts-expect-error - this is for testing
const fs: SedgeFileSystem = {
	readJsonFileSync: () => cache,
	outputJsonFileSync: () => '',
};
const cache: CacheRecord = {
	[join('foo', 'bar', 'baz.json')]: 'af306bb243db97bbd88e1d59a546de87',
	[join('foo', 'qux.json')]: 'd5d96c47b4acc6a85f5853de29f48c46',
};

Deno.test('loadCache', () => {
	assertEquals(loadCache('foo_cache.json', fs), cache);
});

Deno.test('saveCache', () => {
	saveCache('foo_cache.json', cache, fs);
});

Deno.test('filterUnusedCache', async ({ step }) => {
	const foo = join('foo', 'qux.json');
	const bar = join('foo', 'bar', 'baz.json');
	const baz = join('foo', 'bar.ts');
	const { [foo]: _, ...expectedCache } = cache;

	await step('with array of paths', () => {
		assertEquals(
			filterUnusedCache(cache, [bar, baz]),
			expectedCache,
		);
	});

	await step('with walk entries', () => {
		assertEquals(
			filterUnusedCache(
				cache,
				[{ path: bar }, { path: baz }] as WalkEntry[],
			),
			expectedCache,
		);
	});
});
