import { Command } from 'cliffy/command/mod.ts';
import { walkSync } from 'fs';
import { globToRegExp, join } from 'path';
import { logger } from '../../shared/mod.ts';

export const clean = new Command()
	.description('Clean Sedge file cache')
	.action(() => {
		try {
			[
				...(walkSync('.sedge', {
					includeDirs: false,
					match: [
						globToRegExp(join('.sedge', '*_cache.json')),
					],
				})),
			].forEach(({ path }) => Deno.remove(path));

			logger.success('Cleaned up Sedge file cache!');
		} catch {
			logger.warn(`Looks like there's nothing to clean.`);
		}
	});
