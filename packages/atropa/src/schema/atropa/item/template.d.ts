import type {
	ItemComponentsFunction,
	ItemDescriptionFunction,
	ItemEventsFunction
} from './functions'
import { Namespace } from '../../common/template'
import { UseFunction } from '../../common/functions'
import type { ItemComponents_1_10_0 } from '../../../vanilla/item/v1.10.0'
import type {
	ItemComponents_1_16_100,
	ItemEventResponses_1_16_100
} from '../../../vanilla/item/v1.16.100'
import type { ItemComponents_1_17_20 } from '../../../vanilla/item/v1.17.20'
import type { ItemComponents_1_18_10 } from '../../../vanilla/item/v1.18.10'
import type { ItemComponents_1_19_0 } from '../../../vanilla/item/v1.19.0'
import type { Randomize, Sequence } from '../../../vanilla/event/common'

interface ItemTemplate_1_10_0
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_10_0> {}

interface ItemTemplate_1_16_100
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_16_100>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

interface ItemTemplate_1_17_20
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_17_20>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

interface ItemTemplate_1_18_10
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_18_10>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

interface ItemTemplate_1_19_0
	extends ItemDescriptionFunction,
		ItemComponentsFunction<ItemComponents_1_19_0>,
		ItemEventsFunction<
			ItemEventResponses_1_16_100 &
				Randomize<ItemEventResponses_1_16_100> &
				Sequence<ItemEventResponses_1_16_100>
		> {}

type ItemFormatVersion =
	| '1.10.0'
	| '1.16.100'
	| '1.17.20'
	| '1.18.10'
	| '1.19.0'

type ItemTemplate<Version extends ItemFormatVersion> = (Version extends '1.10.0'
	? ItemTemplate_1_10_0
	: Version extends '1.16.100'
	? ItemTemplate_1_16_100
	: Version extends '1.17.20'
	? ItemTemplate_1_17_20
	: Version extends '1.18.10'
	? ItemTemplate_1_18_10
	: Version extends '1.19.0'
	? ItemTemplate_1_19_0
	: never) &
	Namespace &
	UseFunction

export type { ItemTemplate, ItemFormatVersion }
