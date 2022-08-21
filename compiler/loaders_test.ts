import { assertObjectMatch } from 'testing/asserts.ts';
import { fakeFileSystem } from './fs.ts';
import { applyConfig, loadModule } from './loaders.ts';

const moduleResult = {
	type: 'foobar',
	data: { identifier: 'test:foo' },
};

Deno.test('loadModule', async () => {
	const result = await loadModule('/test.ts', {
		fs: fakeFileSystem,
		config: { namespace: 'test' },
	});

	assertObjectMatch(result, moduleResult);
});

Deno.test('applyConfig: with config', () => {
	assertObjectMatch(
		applyConfig(moduleResult, { namespace: 'test' }),
		moduleResult,
	);
});

Deno.test('applyConfig: without config', () => {
	assertObjectMatch(applyConfig(moduleResult, {}), moduleResult);
});
