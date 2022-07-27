import { deepMerge, objectMap } from '@antfu/utils'
import type { BlockComponents_1_16_0 } from '../../schema/vanilla/block/v1.16.0'
import type {
	BlockComponents_1_16_100,
	BlockEventResponses_1_16_100
} from '../../schema/vanilla/block/v1.16.100'
import type { BlockComponents_1_18_10 } from '../../schema/vanilla/block/v1.18.10'
import type { BlockComponents_1_18_30 } from '../../schema/vanilla/block/v1.18.30'
import type { BlockComponents_1_19_10 } from '../../schema/vanilla/block/v1.19.10'
import type { BlockComponents_1_19_20 } from '../../schema/vanilla/block/v1.19.20'
import type { Randomize, Sequence } from '../../schema/vanilla/event/common'
import { ensureNamespaces, tryCatch } from '../utils'
import type { Description, Namespace, UseFunction } from './types'

interface BlockDescriptionFunction<WithProperties extends boolean> {
	/**
	 * # Description
	 * The description sets required block information.
	 * @param template The description template.
	 */
	description(
		template: WithProperties extends true
			? Description & {
					/**
					 * ## Properties
					 * Defines block properties and their possible values.
					 */
					properties?: {
						[key: string]: string[] | boolean[] | number[]
					}
			  }
			: Description
	): void
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
			condition?: string
			/**
			 * ## Components
			 * Components to add when the condition evaluates to `true`.
			 */
			components?: Components
		}[]
	): void
}
interface BlockComponentsFunction<Components extends Record<string, any>> {
	/**
	 * # Components
	 * Components are used to describe the block's attributes and behavior.
	 * @param template The components to add to the block.
	 */
	components(template: Components): void
}
interface BlockEventsFunction<Events extends Record<string, any>> {
	/**
	 * # Events
	 * The events function defines the events that can be triggered by this block.
	 * @param template The events to add to the block.
	 */
	events(template: Record<string, Events>): void
}

interface BlockTemplate_1_16_0
	extends BlockDescriptionFunction<false>,
		BlockComponentsFunction<BlockComponents_1_16_0> {}

interface BlockTemplate_1_16_100
	extends BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_16_100>,
		BlockComponentsFunction<BlockComponents_1_16_100>,
		BlockEventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}

interface BlockTemplate_1_18_10
	extends BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_18_10>,
		BlockComponentsFunction<BlockComponents_1_18_10>,
		BlockEventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}
interface BlockTemplate_1_18_30
	extends BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_18_30>,
		BlockComponentsFunction<BlockComponents_1_18_30>,
		BlockEventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}
interface BlockTemplate_1_19_10
	extends BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_19_10>,
		BlockComponentsFunction<BlockComponents_1_19_10>,
		BlockEventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}

interface BlockTemplate_1_19_20
	extends BlockDescriptionFunction<true>,
		BlockPermutationsFunction<BlockComponents_1_19_20>,
		BlockComponentsFunction<BlockComponents_1_19_20>,
		BlockEventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}

export type BlockFormatVersion =
	| '1.16.0'
	| '1.16.100'
	| '1.18.10'
	| '1.18.30'
	| '1.19.10'
	| '1.19.20'

export type BlockTemplate<Version extends BlockFormatVersion> =
	(Version extends '1.16.0'
		? BlockTemplate_1_16_0
		: Version extends '1.16.100'
		? BlockTemplate_1_16_100
		: Version extends '1.18.10'
		? BlockTemplate_1_18_10
		: Version extends '1.18.30'
		? BlockTemplate_1_18_30
		: Version extends '1.19.10'
		? BlockTemplate_1_19_10
		: Version extends '1.19.20'
		? BlockTemplate_1_19_20
		: never) &
		Namespace &
		UseFunction

type UserTemplate = Partial<BlockTemplate<'1.19.20'>>
interface VanillaTemplate {
	description?: Record<string, any>
	components?: Record<string, any>
	permutations?: Record<string, any>[]
	events?: Record<string, any>
}
interface Block {
	format_version: string
	'minecraft:block': VanillaTemplate
}

/**
 * # Define Block
 * Generates a new block based on the given templates.
 * @param version The format version of the block.
 * @param fn A callback function with parameters to define the block.
 * @returns A module result.
 */
export function defineBlock<Version extends BlockFormatVersion>(
	version: Version,
	fn: (template: BlockTemplate<Version>) => void
): Block {
	return tryCatch(() => {
		const template = {}

		fn(processTemplate(template) as BlockTemplate<Version>)

		return transformTemplate(template, version)
	}, 'Failed to transform block template')
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: atropa.config.namespace,
		description: (_template) => {
			template.description = { ...template.description, ..._template }
		},
		components: (_template) => {
			template.components = { ...template.components, ..._template }
		},
		permutations: (_template) => {
			template.permutations = [
				...(template.permutations || []),
				..._template
			]
		},
		events: (_template) => {
			template.events = { ...template.events, ..._template }
		},
		use: (...components) => {
			deepMerge(template, ...components)
		}
	}
}

function transformTemplate(template: VanillaTemplate, version: string): Block {
	const transformedTemplate = objectMap(
		template as Required<VanillaTemplate>,
		(key, value) => {
			if (key === 'components') {
				return [key, ensureNamespaces(value, 'minecraft')]
			}
			if (key === 'permutations' && Array.isArray(value)) {
				for (const permutation of value) {
					permutation.components = ensureNamespaces(
						permutation.components,
						'minecraft'
					)
				}
			}
			return [key, value]
		}
	) as VanillaTemplate

	return {
		format_version: version,
		'minecraft:block': transformedTemplate
	}
}
