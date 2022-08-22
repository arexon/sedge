import { join } from 'path';
import { assertEquals, assertStringIncludes } from 'testing/asserts.ts';
import { testFileSystem } from './fs.ts';
import { Sedge } from './mod.ts';
import { findMojangDir, getMojangDirPack, getTargetPath } from './path.ts';

const sedge = {
	config: {
		name: 'test',
		packs: {
			behaviorPack: './packs/BP',
			resourcePack: './packs/RP',
		},
	},
	target: {
		path: './games/com.mojang',
		isMojangDir: true,
	},
} as Sedge;

Deno.test('getTargetPath: in mojang directory', () => {
	assertEquals(
		getTargetPath(join('packs', 'BP', 'blocks', 'foo.ts'), sedge),
		join(
			'games',
			'com.mojang',
			'development_behavior_packs',
			'test BP',
			'blocks',
			'foo.ts',
		),
	);
	assertEquals(
		getTargetPath(join('packs', 'RP', 'blocks', 'foo.ts'), sedge),
		join(
			'games',
			'com.mojang',
			'development_resource_packs',
			'test RP',
			'blocks',
			'foo.ts',
		),
	);
});

Deno.test('getTargetPath: in production', () => {
	sedge.target.path = './build';
	sedge.target.isMojangDir = false;

	assertEquals(
		getTargetPath(join('packs', 'BP', 'blocks', 'foo.ts'), sedge),
		join('build', 'packs', 'BP', 'blocks', 'foo.ts'),
	);
	assertEquals(
		getTargetPath(join('packs', 'RP', 'blocks', 'foo.ts'), sedge),
		join('build', 'packs', 'RP', 'blocks', 'foo.ts'),
	);
});

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

Deno.test('findMojangDir', () => {
	assertStringIncludes(
		findMojangDir(testFileSystem),
		join(
			'Packages',
			'Microsoft.MinecraftUWP_8wekyb3d8bbwe',
			'LocalState',
			'games',
			'com.mojang',
		),
	);
});
