import type * as EventResponse_1_16_100 from '../../event/v1.16.100/responses'

type EventResponses = EventResponse_1_16_100.TriggerBlock &
	EventResponse_1_16_100.Damage &
	EventResponse_1_16_100.DecrementStack &
	EventResponse_1_16_100.Die &
	EventResponse_1_16_100.AddMobEffect &
	EventResponse_1_16_100.RemoveMobEffect &
	EventResponse_1_16_100.RunCommand &
	EventResponse_1_16_100.SetBlock &
	EventResponse_1_16_100.SetBlockAtPos &
	EventResponse_1_16_100.SetBlockProperty &
	EventResponse_1_16_100.SpawnLoot &
	EventResponse_1_16_100.Swing &
	EventResponse_1_16_100.Teleport &
	EventResponse_1_16_100.TransformItem

export { EventResponses }
