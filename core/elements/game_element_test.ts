import { assertEquals } from 'testing/asserts.ts';
import { Result } from '../types.ts';
import { createGameElement } from './game_element.ts';

Deno.test('createGameElement', () => {
	const defineFooBar = createGameElement<
		{ foo(name: string): void },
		{ version: number; foo: string },
		Result<{ baz: number; foo: string }>
	>({
		process: (template) => ({
			foo: (name) => template.foo = name,
		}),
		transform: (template) => ({
			type: 'gameElement',
			data: {
				baz: 1,
				foo: template.foo,
			},
		}),
	});

	const result = defineFooBar(({ foo }) => {
		foo('bar');
	});

	assertEquals(result, {
		type: 'gameElement',
		data: {
			baz: 1,
			foo: 'bar',
		},
	});
});
