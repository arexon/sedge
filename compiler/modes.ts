import { logger } from '../shared/logger.ts';
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
