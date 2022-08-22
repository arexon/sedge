import { WalkEntry, walkSync } from 'fs';
import { globToRegExp, join } from 'path';
import { logger } from '../shared/logger.ts';
import { ConfigPacks } from './loaders.ts';

export function findPathsInPacks(options: {
	packs: Partial<ConfigPacks>;
	ignorePaths?: string[];
}): {
	modules: WalkEntry[];
	assets: WalkEntry[];
} {
	const BP = options.packs.behaviorPack!;
	const RP = options.packs.resourcePack!;

	const moduleGlobs = [
		globToRegExp(join(RP, '**/*.ts')),
		globToRegExp(join(BP, '**/*.ts')),
	];

	const ignoredPaths = options.ignorePaths?.map((path) => {
		return globToRegExp(path);
	});

	const modules = [
		...(walkSync('.', {
			includeDirs: false,
			match: moduleGlobs,
			skip: [
				globToRegExp(join(BP, 'components/**')),
				globToRegExp(join(BP, 'scripts/**')),
				...(ignoredPaths || []),
			],
		})),
	];
	const assets = [
		...(walkSync('.', {
			includeDirs: false,
			match: [
				globToRegExp(join(RP, '**/*')),
				globToRegExp(join(BP, '**/*')),
			],
			skip: [...moduleGlobs, ...(ignoredPaths || [])],
		})),
	];

	return { modules, assets };
}

export function getMojangDirPack(
	packName: string,
	packType: 'BP' | 'RP',
	targetPath: string,
): string {
	return join(
		targetPath,
		`development_${packType === 'BP' ? 'behavior' : 'resource'}_packs`,
		`${packName} ${packType}`,
	);
}

export function findMojangDir(): string {
	try {
		const path = join(
			Deno.env.get('LOCALAPPDATA') || '',
			'Packages',
			'Microsoft.MinecraftUWP_8wekyb3d8bbwe',
			'LocalState',
			'games',
			'com.mojang',
		);
		Deno.lstatSync(path).isDirectory;

		return path;
	} catch (_) {
		logger.error(
			'Could not find the [com.mojang] directory. Please ensure that Minecraft is properly installed',
		);
		Deno.exit(1);
	}
}
