import { AimCollision, BlockCollision, BlockLightFilter } from './components'
import {
	BreakOnPush,
	Breathability,
	CraftingTable,
	CreativeCategory,
	DisplayName,
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
	PlacementFilter,
	PreventJumping,
	RandomTicking,
	Rotation,
	Ticking,
	UnitCube,
	Unwalkable
} from '../v1.16.100/components'
import {
	DestoryTime,
	ExplosionResistance,
	Flammable,
	Friction,
	Loot,
	MapColor
} from '../v1.16.0/components'

export type Components_1_18_10 =
	// 1.18.10
	AimCollision &
		BlockCollision &
		BlockLightFilter &
		// 1.16.100
		BreakOnPush &
		Breathability &
		CraftingTable &
		CreativeCategory &
		DisplayName &
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
