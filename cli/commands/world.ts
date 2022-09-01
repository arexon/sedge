import { Command } from 'cliffy/command/mod.ts';
import { copy } from 'fs';
import { join, resolve } from 'path';
import { sedgeFileSystem } from '../../compiler/fs.ts';
import { loadConfig } from '../../compiler/loaders.ts';
import { findMojangDir } from '../../compiler/path.ts';
import { logger } from '../../shared/mod.ts';

export const world = new Command()
	.description(
		'Saves or tests a world from or to the `com.mojang` directory respectively.',
	)
	.option(
		'-s, --save <worlds...:string>',
		'Saves a world by copying it from from `com.mojang` directory.',
		{ required: true },
	)
	.option(
		'-t, --test <worlds...:string>',
		'Tests a world by copying it to the `com.mojang` directory.',
		{ conflicts: ['save'], required: true },
	)
	.action(({ save, test }) => {
		const { packs } = loadConfig('config.json', sedgeFileSystem);

		const getTargetWorldPath = (name: string) => {
			return resolve(
				findMojangDir(sedgeFileSystem),
				'minecraftWorlds',
				name,
			);
		};
		const saveWorld = async (world: string): Promise<void> => {
			const targetPath = getTargetWorldPath(world);
			const worldPath = join(packs.worldTemplate, world);

			try {
				Deno.statSync(targetPath);
			} catch {
				logger.error(
					`Could not find world [${world}] in the [com.mojang] directory.`,
				);
				Deno.exit(0);
			}

			await copy(targetPath, worldPath, { overwrite: true });

			logger.success(`World [${world}] was saved to (${worldPath}).`);
		};
		const testWorld = async (world: string): Promise<void> => {
			const worldPath = join(packs.worldTemplate, world);
			const targetPath = getTargetWorldPath(world);

			try {
				Deno.statSync(worldPath);
			} catch {
				logger.error(
					`Could not find world [${world}] in (${worldPath}).`,
				);
				Deno.exit(0);
			}

			await copy(worldPath, targetPath, { overwrite: true });

			logger.success(
				`World [${world}] was copied to the [com.mojang] directory.`,
			);
		};

		if (save) save.forEach(async (world) => await saveWorld(world));
		else if (test) test.forEach(async (world) => await testWorld(world));
	});
