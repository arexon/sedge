import { assertEquals } from 'testing/asserts.ts';
import { createGameElement, GameElementResult } from './game_element.ts';

Deno.test('createGameElement', () => {
	const defineFooBar = createGameElement<
		{ foo(name: string): void },
		{ version: number; foo: string },
		GameElementResult<{ baz: number; foo: string }>
	>({
		process: (template) => ({
			foo: (name) => template.foo = name,
		}),
		transform: (template) => ({
			extension: '.json',
			data: {
				baz: 1,
				foo: template.foo,
			},
		}),
	});

	assertEquals(
		defineFooBar(({ foo }) => {
			foo('bar');
		}),
		{
			extension: '.json',
			data: {
				baz: 1,
				foo: 'bar',
			},
		},
	);
});
