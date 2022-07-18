import type { Subject } from '../../general/filter'
import type { Effect, EffectNames } from '../../general/effect'
import type { DamageTypes } from '../../general/damage'
import type { EventTrigger } from './triggers'

interface AddMobEffect {
	/**
	 * ## Add Mob Effect
	 *
	 * Apply mob effect to target.
	 */
	add_mob_effect?: {
		/**
		 * ### Target
		 *
		 * Block or entity to target
		 *
		 * @default 'self'
		 */
		target?: Subject
	} & Effect
}

interface Damage {
	/**
	 * ## Damage
	 *
	 * Deals damage to the target.
	 */
	damage?: {
		/**
		 * ### Type
		 *
		 * The type of damage to deal.
		 */
		type: DamageTypes

		/**
		 * ### Amount
		 *
		 * The amount of damage to deal.
		 *
		 * @default 0
		 */
		amount?: number

		/**
		 * ### Target
		 *
		 * The target context to execute against.
		 *
		 * @default 'self'
		 */
		target?: Subject
	}
}

interface DecrementStack {
	/**
	 * ## Decrement Stack
	 *
	 * Decrement the item stack.
	 */
	decrement_stack?: Record<string, never>
}

interface Die {
	/**
	 * ## Die
	 *
	 * Kill target. If target is self and this is run from a block then destroy the block.
	 *
	 * @default 'self'
	 */
	die?: Subject
}

interface RemoveMobEffect {
	/**
	 * ## Remove Mob Effect
	 *
	 * Removes mob effect from target.
	 */
	remove_mob_effect?: {
		/**
		 * ### Effect
		 *
		 * The mob effect to remove. Use `all` to remove all mob effects from target.
		 */
		effect: EffectNames | 'all'

		/**
		 * ### Target
		 *
		 * The target context to execute against.
		 *
		 * @default 'self'
		 */
		target?: Subject
	}
}

interface RunCommand {
	/**
	 * ## Run Command
	 *
	 * Triggers a slash command or a list of slash commands.
	 */
	run_command?: {
		/**
		 * ### Command
		 *
		 * Slash command to run.
		 */
		command: string | string[]

		/**
		 * ### Target
		 *
		 * The target context to execute against.
		 *
		 * @default 'self'
		 */
		target?: Subject
	}
}

interface SetBlock {
	/**
	 * ## Set Block
	 *
	 * Sets this block to another block type.
	 */
	set_block?: {
		/**
		 * ### Block Type
		 *
		 * The type of block to set.
		 */
		block_type: string
	}
}

interface SetBlockAtPos {
	/**
	 * ## Set Block At Pos
	 *
	 * Sets a block relative to this block to another block type.
	 */
	set_block_at_pos?: {
		/**
		 * ### Block Offset
		 *
		 * The offset from the block's center.
		 *
		 * @default [0.0, 0.0, 0.0]
		 */
		block_offset?: [number, number, number]

		/**
		 * ### Block Type
		 *
		 * The type of block to set.
		 */
		block_type: string
	}
}

interface SetBlockProperty {
	/**
	 * ## Set Block Property
	 *
	 * Sets a block property on this block.
	 */
	set_block_property?: {
		/**
		 * ### Block Property
		 *
		 * Block property to set on the block.
		 */
		[name: string]: string | number | boolean
	}
}

interface SpawnLoot {
	/**
	 * ## Spawn Loot
	 *
	 * Spawn loot from block.
	 */
	spawn_loot?: {
		/**
		 * ### Table
		 *
		 * File path, relative to the Behavior Pack's path, to the loot table file.
		 */
		table: string
	}
}

interface Shoot {
	/**
	 * ## Shoot
	 * Shoot a projectile.
	 */
	shoot?: {
		/**
		 * #### Target
		 * The target context to execute against.
		 */
		target: Subject
		/**
		 * #### Projectile
		 * The projectile to shoot.
		 */
		projectile: string
		/**
		 * #### Launch Power
		 * The launch power of the projectile.
		 */
		launch_power: number
		/**
		 * #### Angle Offset
		 * The angle offset of the projectile.
		 */
		angle_offset: number | string
	}
}

interface Swing {
	/**
	 * ## Swing
	 *
	 * Event causes the actor to swing.
	 */
	swing?: Record<string, never>
}

interface Teleport {
	/**
	 * ## Teleport
	 *
	 * Teleport target randomly around destination point.
	 */
	teleport?: {
		/**
		 * ### Avoid Water
		 *
		 * Determines if the teleport avoids putting the target in water.
		 *
		 * @default true
		 */
		avoid_water?: boolean

		/**
		 * ### Destination
		 *
		 * Origin destination of the teleport.
		 *
		 * @default [0.0, 0.0, 0.0]
		 */
		destination?: [number, number, number]

		/**
		 * ### Land on Block
		 *
		 * Determines if the teleport places the target on a block.
		 *
		 * @default true
		 */
		land_on_block?: boolean

		/**
		 * ### Max Range
		 *
		 * Max range the target can teleport relative to the origin destination.
		 */
		max_range?: number

		/**
		 * ### Target
		 *
		 * The target context to execute against.
		 *
		 * @default 'self'
		 */
		target?: Subject
	}
}

interface TransformItem {
	/**
	 * ## Transform Item
	 *
	 * Transforms item into another item.
	 */
	transform_item?: {
		/**
		 * ### Transform
		 *
		 * Name of the item it should transform into.
		 */
		transform: string
	}
}

interface TriggerBlock {
	/**
	 * ## Trigger Block
	 *
	 * Trigger an event.
	 */
	trigger?: EventTrigger
}

interface TriggerItem {
	/**
	 * ## Trigger Item
	 * Trigger an event.
	 */
	trigger?: EventTrigger
}

export type {
	AddMobEffect,
	Damage,
	DecrementStack,
	Die,
	RemoveMobEffect,
	RunCommand,
	SetBlock,
	SetBlockAtPos,
	SetBlockProperty,
	SpawnLoot,
	Shoot,
	Swing,
	Teleport,
	TransformItem,
	TriggerBlock,
	TriggerItem
}
