import { assertEquals, assertObjectMatch } from 'testing/asserts.ts';
import { ensureNamespaces, ensurePrefix } from './utils.ts';

Deno.test('ensurePrefix', async ({ step }) => {
	await step('return a prefixed string', () => {
		assertEquals(ensurePrefix('foo', 'bar'), 'foo:bar');
	});

	await step('not modify the already prefixed string', () => {
		assertEquals(ensurePrefix('foo', 'foo:bar'), 'foo:bar');
	});
});

Deno.test('ensureNamespaces', async ({ step }) => {
	await step('prefix all high-level keys with a namespace', () => {
		assertObjectMatch(
			ensureNamespaces({
				foo: { bar: 'baz' },
				bar: true,
				baz: true,
			}, 'foobar'),
			{
				'foobar:foo': { bar: 'baz' },
				'foobar:bar': true,
				'foobar:baz': true,
			},
		);
	});

	await step('not modify keys that are already namespaced', () => {
		assertObjectMatch(
			ensureNamespaces({
				'foobar:foo': { bar: 'baz' },
				'foobar:bar': true,
				baz: true,
			}, 'foobar'),
			{
				'foobar:foo': { bar: 'baz' },
				'foobar:bar': true,
				'foobar:baz': true,
			},
		);
	});

	await step('skip an empty object', () => {
		assertObjectMatch(ensureNamespaces({}, 'foobar'), {});
	});
});
