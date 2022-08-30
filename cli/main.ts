import { Command } from 'cliffy/command/mod.ts';
import {
	DenoLandProvider,
	UpgradeCommand,
} from 'cliffy/command/upgrade/mod.ts';
import { startSedge } from '../compiler/mod.ts';
import { SEDGE_VERSION } from '../shared/mod.ts';

if (import.meta.main) {
	const build = new Command()
		.description('Compile the project in prod mode.')
		.option(
			'-t, --target <name:string>',
			'The build target configured in config.json.',
			{ default: 'default' },
		)
		.action(async ({ target }) => {
			await startSedge({ target, mode: 'build' });
		});

	const dev = new Command()
		.description('Compile the project in dev mode and watch for changes.')
		.option(
			'-t, --target <name:string>',
			'The build target configured in config.json.',
			{ default: 'default' },
		)
		.action(async ({ target }) => {
			await startSedge({ target, mode: 'dev' });
		});

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
		.parse(Deno.args);
}
