import * as Components_1_16_0 from '../v1.16.0/components.d.ts';
import * as Components_1_16_100 from '../v1.16.100/components.d.ts';
import * as TriggerComponents_1_16_100 from '../v1.16.100/trigger_components.d.ts';
import * as Components_1_19_10 from '../v1.19.10/components.d.ts';
import * as Components_1_19_20 from './components.d.ts';

interface BlockComponents_1_19_20
	extends
		Components_1_19_20.DestructibleByMining,
		Components_1_19_20.Friction,
		Components_1_19_20.LightEmission,
		Components_1_19_20.SelectionBox,
		Components_1_19_10.CollisionBox,
		Components_1_19_10.CraftingTable,
		Components_1_19_10.Flammable,
		Components_1_19_10.LightDampening,
		Components_1_19_10.PartVisibility,
		Components_1_19_10.QueuedTicking,
		Components_1_16_100.Breathability,
		Components_1_16_100.CreativeCategory,
		Components_1_16_100.DisplayName,
		Components_1_16_100.Geometry,
		Components_1_16_100.MaterialInstances,
		Components_1_16_100.PlacementFilter,
		Components_1_16_100.RandomTicking,
		Components_1_16_100.Rotation,
		Components_1_16_100.UnitCube,
		TriggerComponents_1_16_100.OnFallOn,
		TriggerComponents_1_16_100.OnInteract,
		TriggerComponents_1_16_100.OnPlaced,
		TriggerComponents_1_16_100.OnPlayerDestroyed,
		TriggerComponents_1_16_100.OnPlayerPlacing,
		TriggerComponents_1_16_100.OnPlayerStepOff,
		TriggerComponents_1_16_100.OnPlayerStepOn,
		Components_1_16_0.DestoryTime,
		Components_1_16_0.ExplosionResistance,
		Components_1_16_0.Loot,
		Components_1_16_0.MapColor {}

export { BlockComponents_1_19_20 };
