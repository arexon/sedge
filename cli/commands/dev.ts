import { Command } from 'cliffy/command/mod.ts';
import { startSedge } from '../../compiler/mod.ts';

export const dev = new Command()
	.description('Compile the project in dev mode and watch for changes.')
	.option(
		'-t, --target <name:string>',
		'The build target configured in config.json.',
		{ default: 'default' },
	)
	.action(async ({ target }) => await startSedge({ target, mode: 'dev' }));
