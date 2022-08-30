import { Command } from 'cliffy/command/command.ts';
import { logger, SEDGE_CACHE_FILE } from '../../shared/mod.ts';

export const clean = new Command()
	.description('Clean Sedge file cache')
	.action(async () => {
		try {
			await Deno.remove(SEDGE_CACHE_FILE);
			logger.success('Cleaned up Sedge file cache!');
		} catch {
			logger.warn(`Looks like there's nothing to clean.`);
		}
	});
