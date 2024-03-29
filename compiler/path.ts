import { WalkEntry, walkSync } from 'fs';
import { extname, globToRegExp, join, normalize, relative } from 'path';
import { logger } from '../shared/mod.ts';
import { SedgeFileSystem } from './fs.ts';
import { ConfigPacks } from './loaders.ts';
import { Sedge } from './start.ts';

export function findPathsInPacks(options: {
	packs: Partial<ConfigPacks>;
	ignorePaths: string[];
}): {
	modules: WalkEntry[];
	assets: WalkEntry[];
	scripts: WalkEntry[];
} {
	const BP = options.packs.behaviorPack!;
	const RP = options.packs.resourcePack!;

	const moduleGlobs = [
		globToRegExp(join(RP, '**/*.ts')),
		globToRegExp(join(BP, '**/*.ts')),
	];

	const ignoredPaths = options.ignorePaths.map((path) => {
		return globToRegExp(path);
	});

	const modules = [
		...(walkSync('.', {
			includeDirs: false,
			match: moduleGlobs,
			skip: [
				globToRegExp(join(BP, 'components/**')),
				globToRegExp(join(BP, 'scripts/**')),
				...ignoredPaths,
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
			skip: [
				globToRegExp(join(BP, 'scripts/**')),
				...moduleGlobs,
				...ignoredPaths,
			],
		})),
	];
	const scripts = [
		...(walkSync('.', {
			includeDirs: false,
			match: [globToRegExp(join(BP, 'scripts/**/*.{js,ts}'))],
		})),
	];

	return { modules, assets, scripts };
}

export function getTargetPath(path: string, sedge: Sedge): string {
	if (sedge.target.isMojangDir) {
		const pathToBP = normalize(sedge.config.packs.behaviorPack);
		const pathToRP = normalize(sedge.config.packs.resourcePack);
		const isBP = path.includes(pathToBP);
		const isRP = path.includes(pathToRP);

		if (isBP) {
			return path.replace(
				pathToBP,
				getMojangDirPack(sedge.config.name, 'BP', sedge.target.path),
			);
		}
		if (isRP) {
			return path.replace(
				pathToRP,
				getMojangDirPack(sedge.config.name, 'RP', sedge.target.path),
			);
		}
	}

	return join(sedge.target.path, path);
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

export function findMojangDir(fs: SedgeFileSystem): string {
	try {
		const path = join(
			Deno.env.get('LOCALAPPDATA') || '',
			'Packages',
			'Microsoft.MinecraftUWP_8wekyb3d8bbwe',
			'LocalState',
			'games',
			'com.mojang',
		);
		fs.statSync(path).isDirectory;

		return path;
	} catch {
		logger.error(
			'Could not find the [com.mojang] directory. Please ensure that Minecraft is properly installed',
		);
		Deno.exit(1);
	}
}

export function toExtension(path: string, newExtension: string): string {
	return path.replace(extname(path), newExtension);
}

export function toRelative(path: string): string {
	return relative(Deno.cwd(), path);
}
