import { assertInstanceOf, assertObjectMatch } from 'testing/asserts.ts';
import { Result } from '../types.ts';
import { createGameElement } from './game_element.ts';

Deno.test('createGameElement', () => {
	const defineFooBar = createGameElement<
		{ foo(name: string): void },
		{ version: number; foo: string },
		Result<{ version: number; foo: string }>
	>({
		process: (template) => ({
			foo: (name) => template.foo = name,
		}),
		transform: (template) => ({
			type: 'gameElement',
			data: {
				version: 1,
				foo: template.foo,
			},
		}),
	});

	assertInstanceOf(defineFooBar, Function);

	const result = defineFooBar(({ foo }) => {
		foo('bar');
	});

	assertObjectMatch(result, {
		type: 'gameElement',
		data: {
			version: 1,
			foo: 'bar',
		},
	});
});
