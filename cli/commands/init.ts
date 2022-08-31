import { Command } from 'cliffy/command/mod.ts';
import { ensureDir } from 'fs';
import { dirname, join } from 'path';
import { logger, SEDGE_VERSION } from '../../shared/mod.ts';

export const init = new Command()
	.description('Scaffolds a new Sedge project')
	.arguments('<dir>')
	.action(async (_, dir) => {
		await ensureDir(dir);

		try {
			const dirIsEmpty = (await Promise.resolve(
				[...Deno.readDirSync(dir)],
			)).length === 0;
			if (!dirIsEmpty) throw new Error();
		} catch {
			logger.warn(
				`Directory ${dir} is not empty. Please empty it or choose a different directory name.`,
			);
			Deno.exit(0);
		}

		const stringify = (value: any) => JSON.stringify(value, null, '\t');

		const baseUrl = `https://deno.land/x/sedge@${SEDGE_VERSION}`;
		const files: Array<Record<'path' | 'data', string>> = [
			{
				path: join(dir, 'import_map.json'),
				data: stringify({
					imports: { sedge: `${baseUrl}/mod.ts` },
				}),
			},
			{
				path: join(dir, 'deno.json'),
				data: stringify({
					tasks: { build: 'sedge build', dev: 'sedge dev' },
					importMap: 'import_map.json',
				}),
			},
			{
				path: join(dir, '.gitignore'),
				data: ['.DS_Store', '.sedge', 'build'].join('\n'),
			},
			{
				path: join(dir, 'config.json'),
				data: stringify({
					$schema: `${baseUrl}/config_schema.json`,
					name: 'sedge-starter',
					namespace: 'starter',
				}),
			},
			...[['data', 'BP'], ['resources', 'RP']].map(([type, pack]) => ({
				path: join(dir, 'packs', pack, 'manifest.json'),
				data: stringify({
					format_version: 2,
					header: {
						name: 'pack.name',
						description: 'pack.description',
						min_engine_version: [1, 19, 0],
						uuid: crypto.randomUUID(),
						version: [1, 0, 0],
					},
					modules: [
						{ type, uuid: crypto.randomUUID(), version: [1, 0, 0] },
					],
				}),
			})),
			...['BP', 'RP'].map((pack) => ({
				path: join(dir, 'packs', pack, 'texts', 'en_US.lang'),
				data: [
					`pack.name=Sedge Starter ${pack}`,
					'pack.description=Basic Sedge starter project',
				].join('\n'),
			})),
			...['BP', 'RP'].map((pack) => ({
				path: join(dir, 'packs', pack, 'texts', 'languages.json'),
				data: stringify(['en_US']),
			})),
			{
				path: join(dir, 'packs', 'BP', 'functions', 'hi.ts'),
				data: [
					'import { defineMCFunction } from "sedge";',
					'',
					'export default defineMcFunction(({ add }) => {',
					'	const animals = ["sheep", "pig", "chicken"];',
					'',
					'	animals.forEach((animal) => add(`say hi ${animal}`));',
					'});',
				].join('\n'),
			},
		];

		await Promise.all([
			...files.map(async ({ path, data }) => {
				await ensureDir(dirname(path));
				await Deno.writeTextFile(path, data);
			}),
		]);

		logger.success('Your Sedge project is ready!');
		logger.info(
			'Start developing by running [deno task dev] or [deno task build].',
		);
	});
