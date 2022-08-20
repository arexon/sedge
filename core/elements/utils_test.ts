import { assertEquals, assertObjectMatch } from 'testing/asserts.ts';
import { ensureNamespaces, ensurePrefix } from './utils.ts';

Deno.test('ensurePrefix: simple prefix', () => {
	assertEquals(ensurePrefix('foo', 'bar'), 'foo:bar');
});

Deno.test('ensurePrefix: already prefixed', () => {
	assertEquals(ensurePrefix('foo', 'foo:bar'), 'foo:bar');
});

Deno.test('ensureNamespaces: simple namespace', () => {
	assertObjectMatch(
		ensureNamespaces({
			foo: {
				bar: 'baz',
			},
			bar: true,
			baz: true,
		}, 'foobar'),
		{
			'foobar:foo': {
				bar: 'baz',
			},
			'foobar:bar': true,
			'foobar:baz': true,
		},
	);
});

Deno.test('ensureNamespaces: some namespaced', () => {
	assertObjectMatch(
		ensureNamespaces({
			'foobar:foo': {
				bar: 'baz',
			},
			'foobar:bar': true,
			baz: true,
		}, 'foobar'),
		{
			'foobar:foo': {
				bar: 'baz',
			},
			'foobar:bar': true,
			'foobar:baz': true,
		},
	);
});

Deno.test('ensureNamespaces: empty input', () => {
	assertObjectMatch(ensureNamespaces({}, 'foobar'), {});
});
