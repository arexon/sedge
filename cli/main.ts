import { Command } from 'cliffy/command/mod.ts';
import {
	DenoLandProvider,
	UpgradeCommand,
} from 'cliffy/command/upgrade/mod.ts';
import { SEDGE_VERSION } from '../shared/mod.ts';
import { build, clean, dev, init, world } from './commands/mod.ts';

await new Command()
	.name('sedge')
	.version(SEDGE_VERSION)
	.description('Command line interface for Sedge.')
	.command(
		'upgrade',
		new UpgradeCommand({
			main: 'cli/main.ts',
			args: [
				'--name sedge',
				'--allow-net',
				'--allow-read',
				'--allow-write',
				'--allow-env',
			],
			provider: new DenoLandProvider({ name: 'sedge' }),
		}),
	)
	.command('build', build)
	.command('dev', dev)
	.command('world', world)
	.command('init', init)
	.command('clean', clean)
	.parse(Deno.args);
