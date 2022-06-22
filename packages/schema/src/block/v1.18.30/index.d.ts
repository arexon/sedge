import {
	AimCollision,
	BlockCollision,
	BlockLightFilter
} from '../v1.18.10/components'
import {
	Breathability,
	CraftingTable,
	CreativeCategory,
	DisplayName,
	Geometry,
	MaterialInstances,
	OnFallOn,
	OnInteract,
	OnPlaced,
	OnPlayerDestroyed,
	OnPlayerPlacing,
	OnPlayerStepOff,
	OnPlayerStepOn,
	PartVisibility,
	PlacementFilter,
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

export type Components_1_18_30 =
	// 1.18.10
	AimCollision &
		BlockCollision &
		BlockLightFilter &
		// 1.16.100
		Breathability &
		CraftingTable &
		CreativeCategory &
		DisplayName &
		Geometry &
		MaterialInstances &
		OnFallOn &
		OnInteract &
		OnPlaced &
		OnPlayerDestroyed &
		OnPlayerPlacing &
		OnPlayerStepOff &
		OnPlayerStepOn &
		PartVisibility &
		PlacementFilter &
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
