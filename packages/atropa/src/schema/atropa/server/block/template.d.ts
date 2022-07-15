import type { Namespace } from '../../namespace'
import type {
	ComponentsFunction,
	DescriptionFunction,
	EventsFunction,
	PermutationsFunction,
	UseFunction
} from './functions'
import type { Components_1_16_0 } from '../../../vanilla/block/v1.16.0'
import type {
	Components_1_16_100,
	EventResponses_1_16_100
} from '../../../vanilla/block/v1.16.100'
import type { Compnoents_1_18_10 } from '../../../vanilla/block/v1.18.10'
import type { Compnoents_1_18_30 } from '../../../vanilla/block/v1.18.30'
import type { Compnoents_1_19_10 } from '../../../vanilla/block/v1.19.10'
import type { Randomize, Sequence } from '../../../vanilla/event/common'

interface Template_1_16_0
	extends DescriptionFunction<false>,
		ComponentsFunction<Components_1_16_0> {}

interface Template_1_16_100
	extends DescriptionFunction<true>,
		PermutationsFunction<Components_1_16_100>,
		ComponentsFunction<Components_1_16_100>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
		> {}

interface Template_1_18_10
	extends DescriptionFunction<true>,
		PermutationsFunction<Compnoents_1_18_10>,
		ComponentsFunction<Compnoents_1_18_10>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
		> {}
interface Template_1_18_30
	extends DescriptionFunction<true>,
		PermutationsFunction<Compnoents_1_18_30>,
		ComponentsFunction<Compnoents_1_18_30>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
		> {}
interface Template_1_19_10
	extends DescriptionFunction<true>,
		PermutationsFunction<Compnoents_1_19_10>,
		ComponentsFunction<Compnoents_1_19_10>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
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
