import { join } from 'path';
import { assertEquals } from 'testing/asserts.ts';
import { getMojangDirPack } from './path.ts';

Deno.test('getMojangDirPack: simple', () => {
	assertEquals(
		getMojangDirPack('foo', 'BP', 'bar'),
		join('bar', 'development_behavior_packs', 'foo BP'),
	);
	assertEquals(
		getMojangDirPack('foo', 'RP', 'bar'),
		join('bar', 'development_resource_packs', 'foo RP'),
	);
});

Deno.test('getMojangDirPack: complex', () => {
	assertEquals(
		getMojangDirPack('foo/bar', 'BP', 'bar/baz'),
		join('bar', 'baz', 'development_behavior_packs', 'foo', 'bar BP'),
	);
	assertEquals(
		getMojangDirPack('foo/bar', 'RP', 'bar/baz'),
		join('bar', 'baz', 'development_resource_packs', 'foo', 'bar RP'),
	);
});
