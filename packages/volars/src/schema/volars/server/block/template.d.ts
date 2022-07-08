import type { Namespace } from '../../namespace'
import type { FormatVersion } from '../../../vanilla/formatVersion'
import type {
	ComponentsFunction,
	DescriptionFunction,
	EventsFunction,
	PermutationsFunction
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
	extends Namespace,
		DescriptionFunction<false>,
		ComponentsFunction<Components_1_16_0> {}

interface Template_1_16_100
	extends Namespace,
		DescriptionFunction<true>,
		PermutationsFunction<Components_1_16_100>,
		ComponentsFunction<Components_1_16_100>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
		> {}
interface Template_1_18_10
	extends Namespace,
		DescriptionFunction<true>,
		PermutationsFunction<Compnoents_1_18_10>,
		ComponentsFunction<Compnoents_1_18_10>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
		> {}
interface Template_1_18_30
	extends Namespace,
		DescriptionFunction<true>,
		PermutationsFunction<Compnoents_1_18_30>,
		ComponentsFunction<Compnoents_1_18_30>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
		> {}
interface Template_1_19_10
	extends Namespace,
		DescriptionFunction<true>,
		PermutationsFunction<Compnoents_1_19_10>,
		ComponentsFunction<Compnoents_1_19_10>,
		EventsFunction<
			EventResponses_1_16_100 &
				Randomize<EventResponses_1_16_100> &
				Sequence<EventResponses_1_16_100>
		> {}

type BlockTemplate<Version extends FormatVersion> = Version extends '1.16.0'
	? Template_1_16_0
	: Version extends '1.16.100'
	? Template_1_16_100
	: Version extends '1.18.10'
	? Template_1_18_10
	: Version extends '1.18.30'
	? Template_1_18_30
	: Version extends '1.19.10'
	? Template_1_19_10
	: never

export { BlockTemplate }
