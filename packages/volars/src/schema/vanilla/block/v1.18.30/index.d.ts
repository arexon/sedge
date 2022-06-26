import type { Namespace } from '../namespace'
import type {
	ComponentsFunction,
	DescriptionFunction,
	EventsFunction,
	PermutationsFunction
} from '../functions'
import type * as Compnoent_1_18_10 from '../v1.18.10/components'
import type * as Compnoent_1_16_100 from '../v1.16.100/components'
import type * as TriggerCompnoent_1_16_100 from '../v1.16.100/triggerComponents'
import type * as Compnoent_1_16_0 from '../v1.16.0/components'
import type { EventResponses } from '../v1.16.100/eventResponses'
import type { Randomize, Sequence } from '../../event/common'

type Components = Compnoent_1_18_10.AimCollision &
	Compnoent_1_18_10.BlockCollision &
	Compnoent_1_18_10.BlockLightFilter &
	Compnoent_1_16_100.Breathability &
	Compnoent_1_16_100.CraftingTable &
	Compnoent_1_16_100.CreativeCategory &
	Compnoent_1_16_100.DisplayName &
	Compnoent_1_16_100.Geometry &
	Compnoent_1_16_100.MaterialInstances &
	Compnoent_1_16_100.PartVisibility &
	Compnoent_1_16_100.PlacementFilter &
	Compnoent_1_16_100.RandomTicking &
	Compnoent_1_16_100.Rotation &
	Compnoent_1_16_100.Ticking &
	Compnoent_1_16_100.UnitCube &
	Compnoent_1_16_100.Unwalkable &
	TriggerCompnoent_1_16_100.OnFallOn &
	TriggerCompnoent_1_16_100.OnInteract &
	TriggerCompnoent_1_16_100.OnPlaced &
	TriggerCompnoent_1_16_100.OnPlayerDestroyed &
	TriggerCompnoent_1_16_100.OnPlayerPlacing &
	TriggerCompnoent_1_16_100.OnPlayerStepOff &
	TriggerCompnoent_1_16_100.OnPlayerStepOn &
	Compnoent_1_16_0.DestoryTime &
	Compnoent_1_16_0.ExplosionResistance &
	Compnoent_1_16_0.Flammable &
	Compnoent_1_16_0.Friction &
	Compnoent_1_16_0.Loot &
	Compnoent_1_16_0.MapColor

type Template_1_18_30 = Namespace &
	DescriptionFunction<true> &
	PermutationsFunction<Components> &
	ComponentsFunction<Components> &
	EventsFunction<
		EventResponses & Randomize<EventResponses> & Sequence<EventResponses>
	>

export { Template_1_18_30 }
