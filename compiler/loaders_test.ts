import { assertEquals, assertObjectMatch } from 'testing/asserts.ts';
import { SEDGE_NAMESPACE } from '../shared/mod.ts';
import { SedgeFileSystem } from './fs.ts';
import { applyConfig, loadConfig, loadModule } from './loaders.ts';

// @ts-expect-error - this is for testing
const fs: SedgeFileSystem = {
	import: () => {
		return Promise.resolve({
			default: {
				type: 'foobar',
				data: { identifier: `${SEDGE_NAMESPACE}:foo` },
			},
		});
	},
	readJsonFileSync: () => ({ namespace: 'foo' }),
};

Deno.test('loadConfig', () => {
	const config = loadConfig('config.json', fs);

	assertObjectMatch(config, { namespace: 'foo' });
});

Deno.test('loadModule', async () => {
	const result = await loadModule('/test.ts', {
		fs,
		config: { namespace: 'test' },
		hash: '',
	});

	assertEquals(result, {
		type: 'foobar',
		data: { identifier: 'test:foo' },
	});
});

Deno.test('applyConfig', async ({ step }) => {
	const moduleResult = {
		type: 'foobar',
		data: { identifier: 'test:foo' },
	};

	await step('with config', () => {
		assertEquals(
			applyConfig(moduleResult, { namespace: 'test' }),
			moduleResult,
		);
	});

	await step('without config', () => {
		assertEquals(applyConfig(moduleResult, {}), moduleResult);
	});
});
