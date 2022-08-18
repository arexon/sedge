import { logger } from '@/shared/logger.ts';
import { join } from 'path';

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
	const path = join(
		Deno.env.get('LOCALAPPDATA') || '',
		'Packages',
		'Microsoft.MinecraftUWP_8wekyb3d8bbwe',
		'LocalState',
		'games',
		'com.mojang',
	);

	if (!Deno.lstatSync(path).isDirectory) {
		logger.error(
			'Could not find the [com.mojang] directory. Please ensure that Minecraft is properly installed',
		);
		Deno.exit(1);
	}

	return path;
}
