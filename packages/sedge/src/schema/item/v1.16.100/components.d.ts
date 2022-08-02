import type { EventTrigger } from '../../event/v1.16.100/triggers'
import type { Range } from '../../general/common'
import type { CreativeGroup, ItemGroup } from '../../general/inventory'
import type { Colors, MusicDiscs, SlotTypes } from '../../general/vanilla'

interface AllowOffHand {
	/**
	 * ## Allow Off-Hand
	 * Whether the item can be placed inside of the off-hand.
	 * @requires Holiday Creator Features
	 */
	allow_off_hand?: boolean
}

interface Armor {
	/**
	 * ## Armor
	 * The armor item component determines the amount of protection you have in your armor item.
	 * @requires Holiday Creator Features
	 */
	armor?: {
		/**
		 * ### Protection
		 * How much protection does the armor item have.
		 */
		protection?: number
		/**
		 * ### Texture Type
		 * Texture Type to apply for the armor. Note that Horse armor is restricted to leather, iron, gold, or diamond.
		 */
		texture_type?:
			| 'leather'
			| 'none'
			| 'chain'
			| 'iron'
			| 'diamond'
			| 'gold'
			| 'elytra'
			| 'turtle'
			| 'netherite'
	}
}

interface BlockPlacer {
	/**
	 * ## Block Placer
	 * Planter items are items that can be planted.
	 * @requires Holiday Creator Features
	 */
	block_placer?: {
		/**
		 * ### Block
		 * Set the placement block name for the planter item.
		 */
		block?: string
		/**
		 * ### Use On
		 * List of block descriptors that contain blocks that this item can be used on. If left empty, all blocks will be allowed.
		 */
		use_on?: string[]
	}
}

interface CanDestoryInCreative {
	/**
	 * ## Can Destroy In Creative
	 * Prevent destruction of blocks in creative mode while holding this item.
	 */
	can_destroy_in_creative?: boolean
}

interface Cooldown {
	/**
	 * ## Cooldown
	 * Cool down time for a component. After you use an item it becomes unusable for the duration specified by the "cool down time" setting in this component.
	 * @requires Holiday Creator Features
	 */
	cooldown?: {
		/**
		 * ### Category
		 * The type of cool down for this item.
		 */
		category?: string
		/**
		 * ### Duration
		 * The duration of time this item will spend cooling down before becoming usable again.
		 */
		duration?: number
	}
}

interface CreativeCategory {
	/**
	 * ## Creative Category
	 * The category for the item to be in the creative menu.
	 */
	creative_category?: ItemGroup | CreativeGroup
}

interface Damage {
	/**
	 * ## Damage
	 * Set the damage an item deals.
	 * @requires Holiday Creator Features
	 */
	damage?: number
}

interface Digger {
	/**
	 * ## Digger
	 * Digger item. Component put on items that dig, similar to pickaxes and axes.
	 * @requires Holiday Creator Features
	 */
	digger?: {
		/**
		 * ### Use Efficiency
		 * Whether to use efficiency.
		 *
		 * @default false
		 */
		use_efficiency?: boolean
		/**
		 * ### Destroy Speeds
		 * Destroy speed per block.
		 */
		destroy_speeds?: {
			/**
			 * #### Block
			 * A single block or a list of blocks tags that are broken at the set speed.
			 */
			block?:
				| {
						/**
						 * ##### Tags
						 * A list of block tags that are broken at the set speed.
						 */
						tags?: 'query.any_tag()' | 'query.all_tags()' | string
				  }
				| string
		}[]
		/**
		 * ### Speed
		 * Destroy speed of the block.
		 */
		speed?: number
		/**
		 * ### On Dig
		 * Trigger for when you dig a block referenced to in "block".
		 */
		on_dig?: EventTrigger
	}
}

interface DisplayName {
	/**
	 * ## Display Name
	 * Display name item component. Display names display the name of an item.
	 * @requires Holiday Creator Features
	 */
	display_name?: {
		/**
		 * ### Name
		 * Set the display name of the item.
		 */
		value?: string
	}
}

interface Durability {
	/**
	 * ## Durability
	 * A property that determines when an item will break from use. The durability of an item is potentially depleted upon use based on the damage chance.
	 * @requires Holiday Creator Features
	 */
	durability?: {
		/**
		 * ### Max Durability
		 * Max durability is the amount of damage that this item can take before breaking.
		 */
		max_durability?: number
		/**
		 * ### Damage Chance
		 * Damage chance is the percentage chance of this item losing durability. Default is set to 100. Defined as an int range with min and max value.
		 */
		damage_chance?: Range
	}
}

interface DyePowder {
	/**
	 * ## Dye Powder
	 * Set that this item is a dye and its dye color.
	 * @requires Holiday Creator Features
	 */
	dye_powder?: {
		/**
		 * ### Color
		 * Set the color of the dye.
		 */
		color?: number
	}
}

interface Enchantable {
	/**
	 * ## Enchantable
	 * Makes this item enchantable.
	 * @requires Holiday Creator Features
	 */
	enchantable?: {
		/**
		 * ### Slot
		 * The slot that this item can be enchanted in.
		 */
		slot?: string
		/**
		 * ### Value
		 * The value of the enchantment.
		 */
		value?: number
	}
}

interface EntityPlacer {
	/**
	 * ## Entity Placer
	 * Allow this item to place entities.
	 * @requires Holiday Creator Features
	 */
	entity_placer?: {
		/**
		 * ### Entity
		 * The entity to be placed in the world.
		 */
		entity?: string
		/**
		 * ### Use On
		 * List of block descriptors that contain blocks that this item can be used on. If left empty, all blocks will be allowed.
		 */
		use_on?: string[]
		/**
		 * ### Dispense On
		 * List of block descriptors that contain blocks that this item can be dispensed on. If left empty, all blocks will be allowed.
		 */
		dispense_on?: string[]
	}
}

interface Explodable {
	/**
	 * ## Explodable
	 * Whether the item entity survives an explosion.
	 * @requires Holiday Creator Features
	 */
	explodable?: boolean
}

interface Fertilizer {
	/**
	 * ## Fertilizer
	 * Allows the item to speed the growth of crops like bone meal.
	 * @requires Holiday Creator Features
	 */
	fertilizer?: {
		/**
		 * ### Type
		 * The type of fertilizer.
		 */
		type?: 'bonemeal' | 'rapid'
	}
}

interface Food {
	/**
	 * ## Food
	 * Makes the item become edible to the player.
	 * @requires Holiday Creator Features
	 */
	food?: {
		/**
		 * ### Nutrition
		 * The amount of nutrition the item provides when eaten.
		 */
		nutrition?: number
		/**
		 * ### Can Always Eat
		 * If true, the player can always eat this item (even when not hungry).
		 *
		 * @default false
		 */
		can_always_eat?: boolean
		/**
		 * ### Saturation Modifier
		 * Saturation Modifier is used in this formula: (`nutrition` * `saturation_modifier` * 2) when appling the saturation buff. Which happens when you eat the item.
		 */
		saturation_modifier?:
			| 'poor'
			| 'low'
			| 'normal'
			| 'good'
			| 'max'
			| 'supernatural'
		/**
		 * ### Using Converts To
		 * When used, convert the *this* item to the one specified.
		 */
		using_converts_to?: string
		/**
		 * ### On Consume
		 * Event to fire once the item has been consumed.
		 */
		on_consume?: EventTrigger
	}
}

interface Fuel {
	/**
	 * ## Fuel
	 * Allows this item to be used as fuel in a furnace, similar to coal.
	 * @requires Holiday Creator Features
	 */
	fuel?: {
		/**
		 * ### Duration
		 * How long in seconds will this cook items for.
		 */
		duration?: number
	}
}

interface HoverTextColor {
	/**
	 * ## Hover Text Color
	 * The color of the item's name.
	 * @requires Holiday Creator Features
	 */
	hover_text_color?: Colors
}

interface Icon {
	/**
	 * ## Icon
	 * The icon item componenent determines the icon to represent the item in the UI and elsewhere.
	 * @requires Holiday Creator Features
	 */
	icon?: {
		/**
		 * ### Texture
		 * The key from the `RP/textures/item_texture.json` `texture_data` object associated with the texture file. Example: `blaze_powder`.
		 */
		texture?: string
		/**
		 * ### Frame
		 * An index or expression for which frame of the icon to display.
		 * @default 0
		 */
		frame?: number
	}
}

interface IgnoresPermission {
	/**
	 * ## Ignores Permission
	 * Ignores player permissions when holding the item.
	 * @requires Holiday Creator Features
	 */
	ignores_permission?: boolean
}

interface KnockbackResistance {
	/**
	 * ## Knockback Resistance
	 * For items that provide knockback resistance.
	 * @requires Holiday Creator Features
	 */
	knockback_resistance?: number
}

interface LiquidClipped {
	/**
	 * ## Liquid Clipped
	 * Whether the item rendering clips liquids.
	 * @requires Holiday Creator Features
	 */
	liquid_clipped?: boolean
}

interface MiningSpeed {
	/**
	 * ## Mining Speed
	 * Set the mining speed of an item.
	 * @requires Holiday Creator Features
	 */
	mining_speed?: number
}

interface MirroredArt {
	/**
	 * ## Mirrored Art
	 * Mirror the item icon.
	 * @requires Holiday Creator Features
	 */
	mirrored_art?: boolean
}

interface OnUse {
	/**
	 * ## On Use
	 * The `on_use` item component allows you to receive an event when the item is used.
	 * @requires Holiday Creator Features
	 */
	on_use?: EventTrigger
}

interface OnUseOn {
	/**
	 * ## On Use On
	 * The `on_use_on` item component allows you to receive an event when the item is used on a block in the world.
	 * @requires Holiday Creator Features
	 */
	on_use_on?: EventTrigger
}

interface Potion {
	/**
	 * ## Potion
	 * Defines the item as a potion.
	 * @requires Holiday Creator Features
	 */
	potion?: {
		/**
		 * ### Type
		 * The type of potion.
		 */
		type?: 'lingering' | 'regular' | 'splash'
	}
}

interface Projectile {
	/**
	 * ## Projectile
	 * Sets the projectile used by `shooter` and `throwable` components.
	 * @requires Holiday Creator Features
	 */
	projectile?: {
		/**
		 * ### Projectile Entity
		 * The entity to use as the projectile for this item when it is used as ammunition.
		 */
		projectile_entity?: string
		/**
		 * ### Minimum Critical Power
		 * The minimum power of the projectile.
		 */
		minimum_critical_power?: number
	}
}

interface Record {
	/**
	 * ## Record
	 * Used by record items to play music.
	 * @requires Holiday Creator Features
	 */
	record?: {
		/**
		 * ### Sound Event
		 * A string value correseponding to a sound event in the game code.
		 */
		sound_event?: MusicDiscs
		/**
		 * ### Duration
		 * A float value that determines how long particles are spawned from the JukeBox Block, should approximately match length of sound event.
		 */
		duration?: number
		/**
		 * ### Comparator Signal
		 * An integer value that represents the strength of the analog signal, used by the Comparator Block.
		 */
		comparator_signal?: number
	}
}

interface RenderOffsets {
	/**
	 * ## Render Offsets
	 * The offset of the item rendered in an entity's hand.
	 * @requires Holiday Creator Features
	 */
	render_offsets?: {
		[key in 'main_hand' | 'off_hand']: {
			[key in 'first_person' | 'third_person']: {
				/**
				 * ### Position
				 */
				position?: [number, number, number]
				/**
				 * ### Rotation
				 */
				rotation?: [number, number, number]
				/**
				 * ### Scale
				 */
				scale?: [number, number, number]
			}
		}
	}
}

interface Repairable {
	/**
	 * ## Repairable
	 * How much damage can this item repair, what items can repair it.
	 * @requires Holiday Creator Features
	 */
	repairable?: {
		/**
		 * ### On Repaired
		 * Event to fire when the item is repaired.
		 */
		on_repaired?: EventTrigger
		/**
		 * ### Repair Items
		 * Repair item entries.
		 */
		repair_items?: {
			/**
			 * #### Items
			 */
			items: string[]
			/**
			 * #### Repair Amount
			 */
			repair_amount: number
		}[]
	}
}

interface Shooter {
	/**
	 * ## Shooter
	 * Allows the item to fire a projectile.
	 * @requires Holiday Creator Features
	 */
	shooter?: {
		/**
		 * ### Max Draw Duration
		 * The maximum duration of the draw animation.
		 * @default 0
		 */
		max_draw_duration?: number
		/**
		 * ### Charge On Draw
		 * Whether the item charges on draw.
		 * @default false
		 */
		charge_on_draw?: boolean
		/**
		 * ### Scale Power by Draw Duration
		 * Whether the power of the projectile scales with the duration of the draw animation.
		 * @default false
		 */
		scale_power_by_draw_duration?: boolean
		/**
		 * ### Launch Power Scale
		 * The scale of the projectile launch power.
		 * @default 1.0
		 */
		launch_power_scale?: number
		/**
		 * ### Max Launch Power
		 * The maximum launch power scale.
		 * @default 1.0
		 */
		max_launch_power?: number
		/**
		 * ### Ammunition
		 * Defines the ammunition item(s) to use.
		 */
		ammunition?: {
			/**
			 * #### Item
			 * The item to use as ammunition.
			 */
			item: string
			/**
			 * #### Use Offhand
			 * Whether the ammunition can be taken from the offhand.
			 */
			use_offhand?: boolean
			/**
			 * #### Search Inventory
			 * Whether the whole inventory should be searched for the ammunition.
			 */
			search_inventory?: boolean
			/**
			 * #### Use in Creative
			 * Whether the ammunition can be used in creative mode.
			 */
			use_in_creative?: boolean
		}[]
	}
}

interface Throwable {
	/**
	 * ## Throwable
	 * Allows the item to be thrown similar to a snowball.
	 * @requires Holiday Creator Features
	 */
	throwable?: {
		/**
		 * ### Do Swing Animation
		 * Whether the item should use the swing animation.
		 * @default false
		 */
		do_swing_animation?: boolean
		/**
		 * ### Max Draw Duration
		 * The maximum duration of the draw animation.
		 * @default 0.0
		 */
		max_draw_duration?: number
		/**
		 * ### Min Draw Duration
		 * The minimum duration of the draw animation.
		 * @default 0.0
		 */
		min_draw_duration?: number
		/**
		 * ### Scale Power by Draw Duration
		 * Whether or not the power the throw increases with duration charged.
		 * @default false
		 */
		scale_power_by_draw_duration?: boolean
		/**
		 * ### Launch Power Scale
		 * The scale at which the power of the throw increases.
		 * @default 1.0
		 */
		launch_power_scale?: number
		/**
		 * ### Max Launch Power
		 * The maximum power to launch the throwable item.
		 * @default 1.0
		 */
		max_launch_power?: number
	}
}

interface UseAnimation {
	/**
	 * ## Use Animation4
	 * The animation to use when the item being used. E.g. when the item being eatin.
	 * @requires Holiday Creator Features
	 */
	use_animation?: 'bow' | 'eat' | 'drink' | 'crossbow' | 'camera'
}

interface Weapon {
	/**
	 * ## Weapon
	 * Added to every weapon item such as axe, sword, trident, bow, crossbow.
	 * @requires Holiday Creator Features
	 */
	weapon?: {
		/**
		 * ### On Hit Block
		 * Event to fire when the item hits a block.
		 */
		on_hit_block?: EventTrigger
		/**
		 * ### On Hurt Entity
		 * Event to fire when the item hits an entity.
		 */
		on_hurt_entity?: EventTrigger
		/**
		 * ### On Not Hurt Entity
		 * Event to fire when the item hit an entity, but did not do any damage.
		 */
		on_not_hurt_entity?: EventTrigger
	}
}

interface Wearable {
	/**
	 * ## Wearable
	 * Makes the item wearable.
	 * @requires Holiday Creator Features
	 */
	wearable?: {
		/**
		 * ### Slot
		 * The slot that the item should be worn in.
		 */
		slot: SlotTypes
		/**
		 * ### Dispensable
		 */
		dispensable?: boolean
	}
}

export type {
	AllowOffHand,
	Armor,
	BlockPlacer,
	CanDestoryInCreative,
	Cooldown,
	CreativeCategory,
	Damage,
	Digger,
	DisplayName,
	Durability,
	DyePowder,
	Enchantable,
	EntityPlacer,
	Explodable,
	Fertilizer,
	Food,
	Fuel,
	HoverTextColor,
	Icon,
	IgnoresPermission,
	KnockbackResistance,
	LiquidClipped,
	MiningSpeed,
	MirroredArt,
	OnUse,
	OnUseOn,
	Potion,
	Projectile,
	Record,
	RenderOffsets,
	Repairable,
	Shooter,
	Throwable,
	UseAnimation,
	Weapon,
	Wearable
}
