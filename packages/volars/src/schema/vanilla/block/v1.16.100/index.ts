import { Namespace } from '../Namespace'
import { Description, Properties, DescriptionFunction } from '../Description'
import { PermutationsFunction } from '../Permutations'
import { ComponentsFunction } from '../Components'
import {
	BreakOnPush,
	Breathability,
	CraftingTable,
	CreativeCategory,
	DisplayName,
	EntityCollision,
	Geometry,
	Immovable,
	MaterialInstances,
	OnFallOn,
	OnInteract,
	OnPlaced,
	OnPlayerDestroyed,
	OnPlayerPlacing,
	OnPlayerStepOff,
	OnPlayerStepOn,
	OnlyPistonPush,
	PartVisibility,
	PickCollision,
	PlacementFilter,
	PreventJumping,
	RandomTicking,
	Rotation,
	Ticking,
	UnitCube,
	Unwalkable
} from './components'
import {
	DestoryTime,
	ExplosionResistance,
	Flammable,
	Friction,
	Loot,
	MapColor
} from '../v1.16.0/components'
import {
	AddMobEffect,
	Damage,
	DecrementStack,
	Die,
	Randomize,
	RemoveMobEffect,
	RunCommand,
	Sequence,
	SetBlock,
	SetBlockAtPos,
	SetBlockProperty,
	SpawnLoot,
	Swing,
	Teleport,
	TransformItem,
	TriggerBlock
} from '../../event/v1.16.100'
import { EventsFunction } from '../EventsFunction'

type Components =
	// 1.16.100
	BreakOnPush &
		Breathability &
		CraftingTable &
		CreativeCategory &
		DisplayName &
		EntityCollision &
		Geometry &
		Immovable &
		MaterialInstances &
		OnFallOn &
		OnInteract &
		OnPlaced &
		OnPlayerDestroyed &
		OnPlayerPlacing &
		OnPlayerStepOff &
		OnPlayerStepOn &
		OnlyPistonPush &
		PartVisibility &
		PickCollision &
		PlacementFilter &
		PreventJumping &
		RandomTicking &
		Rotation &
		Ticking &
		UnitCube &
		Unwalkable &
		// 1.16.0
		DestoryTime &
		ExplosionResistance &
		Flammable &
		Friction &
		Loot &
		MapColor

export type Events = TriggerBlock &
	Damage &
	DecrementStack &
	Die &
	AddMobEffect &
	RemoveMobEffect &
	RunCommand &
	SetBlock &
	SetBlockAtPos &
	SetBlockProperty &
	SpawnLoot &
	Swing &
	Teleport &
	TransformItem

export type Template_1_16_100 = Namespace &
	DescriptionFunction<Description & Properties> &
	PermutationsFunction<Components> &
	ComponentsFunction<Components> &
	EventsFunction<Events & Randomize<Events> & Sequence<Events>>
