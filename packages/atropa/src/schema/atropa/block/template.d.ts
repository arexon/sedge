import type { BlockComponents_1_16_0 } from '../../vanilla/block/v1.16.0'
import type {
	BlockComponents_1_16_100,
	BlockEventResponses_1_16_100
} from '../../vanilla/block/v1.16.100'
import type { BlockComponents_1_18_10 } from '../../vanilla/block/v1.18.10'
import type { BlockComponents_1_18_30 } from '../../vanilla/block/v1.18.30'
import type { BlockComponents_1_19_10 } from '../../vanilla/block/v1.19.10'
import type { BlockComponents_1_19_20 } from '../../vanilla/block/v1.19.20'
import type { Randomize, Sequence } from '../../vanilla/event/common'
import type { UseFunction } from '../common/functions'
import type { Namespace } from '../common/template'
import type {
	BlockComponentsFunction,
	BlockDescriptionFunction,
	BlockEventsFunction,
	BlockPermutationsFunction
} from './functions'

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

type BlockFormatVersion =
	| '1.16.0'
	| '1.16.100'
	| '1.18.10'
	| '1.18.30'
	| '1.19.10'
	| '1.19.20'

type BlockTemplate<Version extends BlockFormatVersion> =
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

export type { BlockTemplate, BlockFormatVersion }
