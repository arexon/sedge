import { assertEquals, assertObjectMatch } from 'testing/asserts.ts';
import { fakeFileSystem } from './fs.ts';
import { applyConfig, loadConfig, loadModule } from './loaders.ts';

Deno.test('loadConfig', async () => {
	const config = await loadConfig(
		'/config.json',
		fakeFileSystem,
	);

	assertObjectMatch(config, { identifier: 'foo' });
});

const moduleResult = {
	type: 'foobar',
	data: { identifier: 'test:foo' },
};

Deno.test('loadModule', async () => {
	const result = await loadModule('/test.ts', {
		fs: fakeFileSystem,
		config: { namespace: 'test' },
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
