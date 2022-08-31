import { join } from 'path';
import { assertEquals } from 'testing/asserts.ts';
import { Sedge } from './mod.ts';
import {
	getMojangDirPack,
	getTargetPath,
	toExtension,
	toRelative,
} from './path.ts';

Deno.test('getTargetPath', async ({ step }) => {
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

	await step('append to the `com.mojang` pack path', () => {
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

	await step('append to the build pack path', () => {
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
});

Deno.test('getMojangDirPack', async ({ step }) => {
	await step('get a path to BP in `com.mojang`', () => {
		assertEquals(
			getMojangDirPack('foo', 'BP', 'bar'),
			join('bar', 'development_behavior_packs', 'foo BP'),
		);

		assertEquals(
			getMojangDirPack('foo', 'RP', 'bar'),
			join('bar', 'development_resource_packs', 'foo RP'),
		);
	});
});

Deno.test('toExtension', () => {
	assertEquals(
		toExtension(join('foo', 'bar', 'baz.ts'), '.json'),
		join('foo', 'bar', 'baz.json'),
	);
});

Deno.test('toRelative', () => {
	Deno.cwd = () => 'foo';

	assertEquals(
		toRelative(join('foo', 'bar', 'baz.json')),
		join('bar', 'baz.json'),
	);
});
