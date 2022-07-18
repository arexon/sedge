import type { Namespace } from '../../namespace'
import type {
	ComponentsFunction,
	DescriptionFunction,
	EventsFunction,
	PermutationsFunction,
	UseFunction
} from './functions'
import type { BlockComponents_1_16_0 } from '../../../vanilla/block/v1.16.0'
import type {
	BlockComponents_1_16_100,
	BlockEventResponses_1_16_100
} from '../../../vanilla/block/v1.16.100'
import type { BlockCompnoents_1_18_10 } from '../../../vanilla/block/v1.18.10'
import type { BlockCompnoents_1_18_30 } from '../../../vanilla/block/v1.18.30'
import type { BlockCompnoents_1_19_10 } from '../../../vanilla/block/v1.19.10'
import type { Randomize, Sequence } from '../../../vanilla/event/common'

interface Template_1_16_0
	extends DescriptionFunction<false>,
		ComponentsFunction<BlockComponents_1_16_0> {}

interface Template_1_16_100
	extends DescriptionFunction<true>,
		PermutationsFunction<BlockComponents_1_16_100>,
		ComponentsFunction<BlockComponents_1_16_100>,
		EventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}

interface Template_1_18_10
	extends DescriptionFunction<true>,
		PermutationsFunction<BlockCompnoents_1_18_10>,
		ComponentsFunction<BlockCompnoents_1_18_10>,
		EventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}
interface Template_1_18_30
	extends DescriptionFunction<true>,
		PermutationsFunction<BlockCompnoents_1_18_30>,
		ComponentsFunction<BlockCompnoents_1_18_30>,
		EventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}
interface Template_1_19_10
	extends DescriptionFunction<true>,
		PermutationsFunction<BlockCompnoents_1_19_10>,
		ComponentsFunction<BlockCompnoents_1_19_10>,
		EventsFunction<
			BlockEventResponses_1_16_100 &
				Randomize<BlockEventResponses_1_16_100> &
				Sequence<BlockEventResponses_1_16_100>
		> {}

type BlockFormatVersion =
	| '1.16.0'
	| '1.16.100'
	| '1.18.10'
	| '1.18.30'
	| '1.19.10'

type BlockTemplate<Version extends BlockFormatVersion> =
	(Version extends '1.16.0'
		? Template_1_16_0
		: Version extends '1.16.100'
		? Template_1_16_100
		: Version extends '1.18.10'
		? Template_1_18_10
		: Version extends '1.18.30'
		? Template_1_18_30
		: Version extends '1.19.10'
		? Template_1_19_10
		: never) &
		Namespace &
		UseFunction

export type { BlockTemplate, BlockFormatVersion }
