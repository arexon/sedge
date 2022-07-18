import type * as Events_1_16_100 from '../../event/v1.16.100/responses'

interface ItemEventResponses_1_16_100
	extends Events_1_16_100.TriggerItem,
		Events_1_16_100.Damage,
		Events_1_16_100.DecrementStack,
		Events_1_16_100.Die,
		Events_1_16_100.AddMobEffect,
		Events_1_16_100.RemoveMobEffect,
		Events_1_16_100.RunCommand,
		Events_1_16_100.SpawnLoot,
		Events_1_16_100.Shoot,
		Events_1_16_100.Swing,
		Events_1_16_100.Teleport,
		Events_1_16_100.TransformItem {}

export type { ItemEventResponses_1_16_100 }
