import { assertObjectMatch } from 'testing/asserts.ts';
import { loadConfig } from './config.ts';
import { fakeFileSystem } from './fs.ts';

Deno.test('loadConfig', async () => {
	const config = await loadConfig(
		'/config.json',
		fakeFileSystem,
	);

	assertObjectMatch(config, { identifier: 'foo' });
});
