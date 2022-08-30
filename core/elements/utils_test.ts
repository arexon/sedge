import { assertEquals, assertObjectMatch } from 'testing/asserts.ts';
import { ensureNamespaces, ensurePrefix } from './utils.ts';

Deno.test('ensurePrefix', async ({ step }) => {
	await step('Should return a prefixed string', () => {
		assertEquals(ensurePrefix('foo', 'bar'), 'foo:bar');
	});

	await step('Should not modify the already prefixed string', () => {
		assertEquals(ensurePrefix('foo', 'foo:bar'), 'foo:bar');
	});
});

Deno.test('ensureNamespaces', async ({ step }) => {
	await step('Should prefix all high-level keys with a namespace', () => {
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

	await step('Should not modify keys already namespaced', () => {
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

	await step('Should skip empty an object', () => {
		assertObjectMatch(ensureNamespaces({}, 'foobar'), {});
	});
});
