import { findPathsInPacks } from '@/compiler/file_system.ts';
import { Sedge } from '@/compiler/mod.ts';
import { logger } from '@/logger.ts';

export async function build(sedge: Sedge, options?: {
	hmr?: boolean;
}): Promise<void> {
	const startTime = Date.now();
	const { assets, modules } = findPathsInPacks({
		packs: sedge.config.packs,
		ignorePaths: sedge.config.sedge.ignorePaths,
	});

	const results = await Promise.allSettled([
		...modules.map(({ path }) => {
			logger.info(`modules (${path})`);
		}),
		...assets.map(({ path }) => {
			logger.info(`assets (${path})`);
		}),
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
