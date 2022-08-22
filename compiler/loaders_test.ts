import { assertEquals, assertObjectMatch } from 'testing/asserts.ts';
import { testFileSystem } from './fs.ts';
import { applyConfig, loadConfig, loadModule } from './loaders.ts';

Deno.test('loadConfig', async () => {
	const config = await loadConfig(
		'/config.json',
		testFileSystem,
	);

	assertObjectMatch(config, { identifier: 'foo' });
});

const moduleResult = {
	type: 'foobar',
	data: { identifier: 'test:foo' },
};

Deno.test('loadModule', async () => {
	const result = await loadModule('/test.ts', {
		fs: testFileSystem,
		config: { namespace: 'test' },
		cache: {},
	});

	assertEquals(result, moduleResult);
});

Deno.test('applyConfig: with config', () => {
	assertEquals(
		applyConfig(moduleResult, { namespace: 'test' }),
		moduleResult,
	);
});

Deno.test('applyConfig: without config', () => {
	assertEquals(applyConfig(moduleResult, {}), moduleResult);
});
