import { Namespace } from '../Namespace'
import { Description, DescriptionFunction, Properties } from '../Description'
import { PermutationsFunction } from '../Permutations'
import { ComponentsFunction } from '../components'
import {
	CollisionBox,
	CraftingTable,
	Flammable,
	LightDampening,
	PartVisibility,
	QueuedTicking
} from './components'
import { AimCollision } from '../v1.18.10/components'
import {
	Breathability,
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
	PlacementFilter,
	RandomTicking,
	Rotation,
	UnitCube,
	Unwalkable
} from '../v1.16.100/components'
import {
	DestoryTime,
	ExplosionResistance,
	Friction,
	Loot,
	MapColor
} from '../v1.16.0/components'

export type Components =
	// 1.19.10
	CollisionBox &
		CraftingTable &
		Flammable &
		LightDampening &
		PartVisibility &
		QueuedTicking &
		// 1.18.10
		AimCollision &
		// 1.16.100
		Breathability &
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
		PlacementFilter &
		RandomTicking &
		Rotation &
		UnitCube &
		Unwalkable &
		// 1.16.0
		DestoryTime &
		ExplosionResistance &
		Friction &
		Loot &
		MapColor

export type Template_1_19_10 = Namespace &
	DescriptionFunction<Description & Properties> &
	PermutationsFunction<Components> &
	ComponentsFunction<Components>
