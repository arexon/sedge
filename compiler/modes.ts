import { resolve } from 'path';
import { logger } from '../shared/logger.ts';
import { loadModule } from './loaders.ts';
import { Sedge } from './mod.ts';
import { findPathsInPacks } from './path.ts';

export async function build(sedge: Sedge): Promise<void> {
	const startTime = Date.now();
	const { assets, modules } = findPathsInPacks({
		packs: sedge.config.packs,
		ignorePaths: sedge.config.sedge.ignorePaths,
	});

	if (assets.length === 0 && modules.length === 0) return;

	const results = await Promise.allSettled([
		...modules.map(async ({ path }) => {
			const result = await loadModule(resolve(path), {
				config: sedge.config,
				fs: sedge.fs,
			});

			console.log(result);
		}),
		...assets.map(() => {}),
		// TODO: compile scripts
	]);

	if (sedge.mode === 'build') {
		const filesNumber = results.filter((result) =>
			result.status === 'fulfilled'
		).length;
		logger.success(
			`Compiled [${filesNumber}] files in ${Date.now() - startTime}ms`,
		);
	}
}
