import { mapEntries } from 'collection/mod.ts';
import {
	BlockComponents_1_16_0,
	BlockComponents_1_16_100,
	BlockComponents_1_18_10,
	BlockComponents_1_18_30,
	BlockComponents_1_19_10,
	BlockComponents_1_19_20,
	BlockEventResponses_1_16_100,
	Randomize,
	Sequence,
} from '../schema/mod.d.ts';
import { tryCatch } from '../shared/try_catch.ts';
import {
	Description,
	DescriptionExperimental,
	Namespace,
	UseFunction,
} from './_interface.ts';
import { ensureNamespaces } from './_util.ts';

interface BlockDescriptionFunction<WithProperties extends boolean> {
	/**
	 * # Description
	 * The description sets required block information.
	 * @param template The description template.
	 */
	description(
		template:
			& (WithProperties extends true ? Description & {
					/**
					 * ## Properties
					 * Defines block properties and their possible values.
					 */
					properties?: {
						[key: string]: string[] | boolean[] | number[];
					};
				}
				: Description)
			& DescriptionExperimental,
	): void;
}
interface BlockPermutationsFunction<Components extends Record<string, any>> {
	/**
	 * # Permutations
	 * List of block permutations based on MoLang queries.
	 * @param template The permutations to add to the block.
	 */
	permutations(
		template: {
			/**
			 * ## Condition
			 * A MoLang condition.
			 */
			condition?: string;
			/**
			 * ## Components
			 * Components to add when the condition evaluates to `true`.
			 */
			components?: Components;
		}[],
	): void;
}
interface BlockComponentsFunction<Components extends Record<string, any>> {
	/**
	 * # Components
	 * Components are used to describe the block's attributes and behavior.
	 * @param template The components to add to the block.
	 */
	components(template: Components): void;
}
interface BlockEventsFunction<Events extends Record<string, any>> {
	/**
	 * # Events
	 * The events function defines the events that can be triggered by this block.
	 * @param template The events to add to the block.
	 */
	events(template: Record<string, Events>): void;
}

interface BlockTemplate_1_16_0
	extends
		BlockDescriptionFunction<false>,
		BlockComponentsFunction<BlockComponents_1_16_0> {}
interface BlockTemplate_1_16_100
	extends
		BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_16_100>,
		BlockComponentsFunction<BlockComponents_1_16_100>,
		BlockEventsFunction<
			& BlockEventResponses_1_16_100
			& Randomize<BlockEventResponses_1_16_100>
			& Sequence<BlockEventResponses_1_16_100>
		> {}
interface BlockTemplate_1_18_10
	extends
		BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_18_10>,
		BlockComponentsFunction<BlockComponents_1_18_10>,
		BlockEventsFunction<
			& BlockEventResponses_1_16_100
			& Randomize<BlockEventResponses_1_16_100>
			& Sequence<BlockEventResponses_1_16_100>
		> {}
interface BlockTemplate_1_18_30
	extends
		BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_18_30>,
		BlockComponentsFunction<BlockComponents_1_18_30>,
		BlockEventsFunction<
			& BlockEventResponses_1_16_100
			& Randomize<BlockEventResponses_1_16_100>
			& Sequence<BlockEventResponses_1_16_100>
		> {}
interface BlockTemplate_1_19_10
	extends
		BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_19_10>,
		BlockComponentsFunction<BlockComponents_1_19_10>,
		BlockEventsFunction<
			& BlockEventResponses_1_16_100
			& Randomize<BlockEventResponses_1_16_100>
			& Sequence<BlockEventResponses_1_16_100>
		> {}
interface BlockTemplate_1_19_20
	extends
		BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_19_20>,
		BlockComponentsFunction<BlockComponents_1_19_20>,
		BlockEventsFunction<
			& BlockEventResponses_1_16_100
			& Randomize<BlockEventResponses_1_16_100>
			& Sequence<BlockEventResponses_1_16_100>
		> {}

export type BlockFormatVersion =
	| '1.16.0'
	| '1.16.100'
	| '1.18.10'
	| '1.18.30'
	| '1.19.10'
	| '1.19.20';
export type BlockTemplate<Version extends BlockFormatVersion> =
	& (Version extends '1.16.0' ? BlockTemplate_1_16_0
		: Version extends '1.16.100' ? BlockTemplate_1_16_100
		: Version extends '1.18.10' ? BlockTemplate_1_18_10
		: Version extends '1.18.30' ? BlockTemplate_1_18_30
		: Version extends '1.19.10' ? BlockTemplate_1_19_10
		: Version extends '1.19.20' ? BlockTemplate_1_19_20
		: never)
	& Namespace
	& UseFunction;

type UserTemplate = Partial<BlockTemplate<'1.19.20'>>;
interface VanillaTemplate {
	description?: Record<string, any>;
	components?: Record<string, any>;
	permutations?: Record<string, any>[];
	events?: Record<string, any>;
}
interface Block {
	format_version: string;
	'minecraft:block': VanillaTemplate;
}
interface BlockResult {
	type: 'json';
	data: Block;
}

/**
 * Create a block element from the given template.
 * @param version The format version of the block
 * @param fn A function that defines the block
 */
export function defineBlock<Version extends BlockFormatVersion>(
	version: Version,
	fn: (template: BlockTemplate<Version>) => void,
): BlockResult {
	return tryCatch(() => {
		const template = {};

		fn(processTemplate(template) as BlockTemplate<Version>);

		return {
			type: 'json',
			data: transformTemplate(template, version),
		};
	}, 'Failed to transform block template');
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: 'TODO',
		description: (_template) => {
			template.description = { ...template.description, ..._template };
		},
		components: (_template) => {
			template.components = { ...template.components, ..._template };
		},
		permutations: (_template) => {
			template.permutations = [
				...(template.permutations || []),
				..._template,
			];
		},
		events: (_template) => {
			template.events = { ...template.events, ..._template };
		},
		// use: (...components) => {
		// 	deepMerge(template, ...components);
		// },
	};
}

function transformTemplate(template: VanillaTemplate, version: string): Block {
	const transformedTemplate = mapEntries(
		template as Required<VanillaTemplate>,
		([key, value]) => {
			if (key === 'components') {
				return [key, ensureNamespaces(value, 'minecraft')];
			}
			if (key === 'permutations' && Array.isArray(value)) {
				for (const permutation of value) {
					permutation.components = ensureNamespaces(
						permutation.components,
						'minecraft',
					);
				}
			}
			return [key, value];
		},
	) as VanillaTemplate;

	return {
		format_version: version,
		'minecraft:block': transformedTemplate,
	};
}
