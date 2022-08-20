import { tryCatch } from '../../shared/try_catch.ts';

export interface GameElementOptions<Template, Data, Result> {
	/**
	 * Return a template which will be used to process the data.
	 * @param data The data to be processed.
	 * @returns The template to be used to process the data.
	 */
	process(data: Data): Template;
	/**
	 * Apply further transformations to the data.
	 * @param data The data that was processed
	 * @return A result object
	 */
	transform(data: Data): Result;
}

/** Create a game element function that can generate data from a given template. */
export function createGameElement<Template, Data, Result>(
	options: GameElementOptions<Template, Data, Result>,
): (fn: (template: Template) => void) => Result {
	const { process, transform } = options;

	return (fn) => {
		return tryCatch(() => {
			const data = {} as Data;

			fn(process(data));
			return transform(data);
		});
	};
}

interface BlockTemplate {
	description(name: string): void;
}
interface BlockData {
	format_version: string;
	description: {
		name: string;
	};
}
interface Result<Data extends Record<string, any>> {
	type: 'gameElement';
	data: Data;
}

export const defineBlock = createGameElement<
	BlockTemplate,
	BlockData,
	Result<BlockData>
>(
	{
		process: (template) => ({
			description(name) {
				template.description = { name };
			},
		}),
		transform: (template) => ({
			type: 'gameElement',
			data: template,
		}),
	},
);
