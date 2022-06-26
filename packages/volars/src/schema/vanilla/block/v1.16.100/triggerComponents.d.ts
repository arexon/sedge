import type { EventTrigger } from '../../event/v1.16.100/triggers'

type OnFallOn = {
	/**
	 * ## On Fall On
	 *
	 * Trigger an event when a player falls onto this block.
	 */
	on_fall_on?: {
		/**
		 * ### Min Fall Distance
		 *
		 * The minimum distance in blocks that an actor needs to fall to trigger this event.
		 */
		min_fall_distance?: number
	} & EventTrigger
}

type OnInteract = {
	/**
	 * ## On Interact
	 *
	 * Trigger an event when this block is interacted with.
	 */
	on_interact?: EventTrigger
}

type OnPlaced = {
	/**
	 * ## On Placed
	 *
	 * Trigger an event when this block is placed.
	 */
	on_placed?: EventTrigger
}

type OnPlayerDestroyed = {
	/**
	 * ## On Player Destroyed
	 *
	 * Trigger an event when a player destroys this block.
	 */
	on_player_destroyed?: EventTrigger
}

type OnPlayerPlacing = {
	/**
	 * ## On Player Placing
	 *
	 * Trigger an event when a player places this block.
	 */
	on_player_placing?: EventTrigger
}

type OnPlayerStepOff = {
	/**
	 * ## On Player Step Off
	 *
	 * Trigger an event when a player leaves this block.
	 */
	on_player_step_off?: EventTrigger
}

type OnPlayerStepOn = {
	/**
	 * ## On Player Step Off
	 *
	 * Trigger an event when a player steps onto this block.
	 */
	on_player_step_on?: EventTrigger
}

export {
	OnFallOn,
	OnInteract,
	OnPlaced,
	OnPlayerDestroyed,
	OnPlayerPlacing,
	OnPlayerStepOff,
	OnPlayerStepOn
}
