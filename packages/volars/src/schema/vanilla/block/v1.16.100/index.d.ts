import type { Namespace } from '../namespace'
import type {
	ComponentsFunction,
	DescriptionFunction,
	EventsFunction,
	PermutationsFunction
} from '../functions'
import type * as Component_1_16_100 from './components'
import type * as TriggerComponent_1_16_100 from './triggerComponents'
import type * as Component_1_16_0 from '../v1.16.0/components'
import type { EventResponses } from './eventResponses'
import type { Randomize, Sequence } from '../../event/common'

type Components = Component_1_16_100.BreakOnPush &
	Component_1_16_100.Breathability &
	Component_1_16_100.CraftingTable &
	Component_1_16_100.CreativeCategory &
	Component_1_16_100.DisplayName &
	Component_1_16_100.EntityCollision &
	Component_1_16_100.Geometry &
	Component_1_16_100.Immovable &
	Component_1_16_100.MaterialInstances &
	Component_1_16_100.OnlyPistonPush &
	Component_1_16_100.PartVisibility &
	Component_1_16_100.PickCollision &
	Component_1_16_100.PlacementFilter &
	Component_1_16_100.PreventJumping &
	Component_1_16_100.RandomTicking &
	Component_1_16_100.Rotation &
	Component_1_16_100.Ticking &
	Component_1_16_100.UnitCube &
	Component_1_16_100.Unwalkable &
	TriggerComponent_1_16_100.OnFallOn &
	TriggerComponent_1_16_100.OnInteract &
	TriggerComponent_1_16_100.OnPlaced &
	TriggerComponent_1_16_100.OnPlayerDestroyed &
	TriggerComponent_1_16_100.OnPlayerPlacing &
	TriggerComponent_1_16_100.OnPlayerStepOff &
	TriggerComponent_1_16_100.OnPlayerStepOn &
	Component_1_16_0.DestoryTime &
	Component_1_16_0.ExplosionResistance &
	Component_1_16_0.Flammable &
	Component_1_16_0.Friction &
	Component_1_16_0.Loot &
	Component_1_16_0.MapColor

type Template_1_16_100 = Namespace &
	DescriptionFunction<true> &
	PermutationsFunction<Components> &
	ComponentsFunction<Components> &
	EventsFunction<
		EventResponses & Randomize<EventResponses> & Sequence<EventResponses>
	>

export { Template_1_16_100 }
