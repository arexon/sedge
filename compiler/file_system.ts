import { WalkEntry, walkSync } from 'fs';
import { globToRegExp, join } from 'path';
import { ConfigPacks } from './config.ts';

export function findPathsInPacks(options: {
	packs: ConfigPacks;
	ignorePaths?: string[];
}): {
	modules: WalkEntry[];
	assets: WalkEntry[];
} {
	const BP = options.packs.behaviorPack;
	const RP = options.packs.resourcePack;

	const moduleGlobs = [
		globToRegExp(join(RP, '**/*.ts')),
		globToRegExp(join(BP, '**/*.ts')),
	];

	const ignoredPaths = options.ignorePaths?.map((path) => {
		return globToRegExp(path);
	});

	const modules = Array.from(walkSync('.', {
		includeDirs: false,
		match: moduleGlobs,
		skip: [
			globToRegExp(join(BP, 'components/**')),
			globToRegExp(join(BP, 'scripts/**')),
			...(ignoredPaths || []),
		],
	}));
	const assets = Array.from(walkSync('.', {
		includeDirs: false,
		match: [
			globToRegExp(join(RP, '**/*')),
			globToRegExp(join(BP, '**/*')),
		],
		skip: [...moduleGlobs, ...(ignoredPaths || [])],
	}));

	return { modules, assets };
}
