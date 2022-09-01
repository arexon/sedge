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
		'-s, --save <world:string>',
		'Saves a world by copying it from from `com.mojang` directory.',
		{ required: true },
	)
	.option(
		'-t, --test <world:string>',
		'Tests a world by copying it to the `com.mojang` directory.',
		{ conflicts: ['save'], required: true },
	)
	.action(async ({ save, test }) => {
		const { packs } = loadConfig('config.json', sedgeFileSystem);

		const getTargetWorldPath = (name: string) => {
			return resolve(
				findMojangDir(sedgeFileSystem),
				'minecraftWorlds',
				name,
			);
		};

		if (save) {
			const targetPath = getTargetWorldPath(save);
			const worldPath = join(packs.worldTemplate, save);

			try {
				Deno.statSync(targetPath);
			} catch {
				logger.error(
					`Could not find world [${save}] in the [com.mojang] directory.`,
				);
				Deno.exit(0);
			}

			await copy(targetPath, worldPath);

			logger.success(`World [${save}] was saved to (${worldPath}).`);
		} else if (test) {
			const worldPath = join(packs.worldTemplate, test);
			const targetPath = getTargetWorldPath(test);

			try {
				Deno.statSync(worldPath);
			} catch {
				logger.error(
					`Could not find world [${test}] in (${worldPath}).`,
				);
				Deno.exit(0);
			}

			await copy(worldPath, targetPath);

			logger.success(
				`World [${test}] was copied to the [com.mojang] directory.`,
			);
		}
	});
