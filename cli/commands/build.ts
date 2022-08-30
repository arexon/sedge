import { Command } from 'cliffy/command/mod.ts';
import { startSedge } from '../../compiler/mod.ts';

export const build = new Command()
	.description('Compile the project in prod mode.')
	.option(
		'-t, --target <name:string>',
		'The build target configured in config.json.',
		{ default: 'default' },
	)
	.action(async ({ target }) => await startSedge({ target, mode: 'build' }));
