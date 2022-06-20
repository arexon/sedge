import { CreativeGroup, ItemGroup } from './vanilla'

declare global {
	type FormatVersion = '1.16.100'

	interface Description {
		/**
		 * ## Identifier
		 *
		 * The identifier for this block.
		 * The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla block.
		 */
		identifier: string
		/**
		 * ## Properties
		 *
		 * Define block properties and their possible values.
		 */
		properties?: {
			[key: `${string}:${string}`]: (string | boolean | number)[]
		}
	}

	interface Components {
		/**
		 * ## Aim Collision
		 *
		 * Describes the collision of the block for raycast and its outline.
		 * If set to false it disables the collision of the block with entities.
		 * An origin of `[-8.0, 0.0, -8.0]` with a size of `[16, 16, 16]` is a unit cube.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:aim_ollision'?:
			| {
					/**
					 * ### Origin
					 *
					 * Minimal position Bounds of the selection box.
					 * Origin is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
					 *
					 * @default [-8.0, 0.0, -8.0]
					 */
					origin: [number, number, number]
					/**
					 * ### Size
					 *
					 * Size of each side of the selection box.
					 * Size is specified as `[x, y, z]`. Origin + size must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
					 *
					 * @default [16.0, 16.0, 16.0]
					 */
					size: [number, number, number]
			  }
			| boolean

		/**
		 * ## Block Collision
		 *
		 * Describes the collision of the block with entities and actors.
		 * If set to false, it disables the collision of the block with entities.
		 * An origin of `[-8.0, 0.0, -8.0]` with a size of `[16, 16, 16]` is a unit cube.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:block_collision'?:
			| {
					/**
					 * ### Origin
					 *
					 * Minimal position Bounds of the collision box.
					 * Origin is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
					 *
					 * @default [-8.0, 0.0, -8.0]
					 */
					origin: [number, number, number]
					/**
					 * ### Size
					 *
					 * Size of each side of the collision box.
					 * Size is specified as `[x, y, z]`. Origin + size must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
					 *
					 * @default [16.0, 16.0, 16.0]
					 */
					size: [number, number, number]
			  }
			| boolean

		/**
		 * ## Block Light Emission
		 *
		 * The amount of light this block will emit in a range `[0.0, 1.0]`.
		 *
		 * @default 0.0
		 */
		'minecraft:block_light_emission'?: number

		/**
		 * ## Block Light Filter
		 *
		 * The amount of light this block will filter out.
		 * Higher value means more light will be filtered out `(0 - 15)`.
		 *
		 * @default 0
		 */
		'minecraft:block_light_filter'?: number

		/**
		 * ## Breathability
		 *
		 * The breathing type of this block that affects the breathing state of mobs when they have their breathing points inside this block.
		 *
		 * @default 'solid'
		 * @requires Holiday Creator Features
		 */
		'minecraft:breathability'?: 'air' | 'solid'

		/**
		 * ## Crafting Table
		 *
		 * Describes the component of a custom crafting table.
		 * This component supports only `"recipe_shaped"` and `"recipe_shapeless"` typed recipes and not others like `"recipe_furnace"` or `"recipe_brewing_mix"`.
		 * If there are two recipes for one item, the recipe book will pick the first that was parsed.
		 * If two input recipes are the same, crafting may assert and the resulting item may vary.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:crafting_table'?: {
			/**
			 * ### Custom Description
			 *
			 * Defines the tags recipes should define to be crafted on this table.
			 * Limited to 64 tags. Each tag is limited to 64 characters.
			 */
			custom_description: string
			/**
			 * ### Crafting Tags
			 *
			 * Defines the language file key that maps what text will be displayed in the UI of this table.
			 * If not specified, the name of the block will be used.
			 */
			crafting_tags: string[]
		}

		/**
		 * ## Creative Category
		 *
		 * Specifies the menu category and group for the block, which determine where this block is placed in the inventory and crafting table container screens.
		 * If this component is omitted, the block will not appear in the inventory or crafting table container screens.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:creative_category'?: {
			/**
			 * ### Creative Group
			 *
			 * Determines which category this block will be placed under in the inventory and crafting table container screens.
			 * If omitted or "none" is specified, the block will not appear in the inventory or crafting table container screens.
			 */
			group?: CreativeGroup | ItemGroup
			/**
			 * ### Category
			 *
			 * Specifies the language file key that maps to which expandable/collapsible group this block will be a part of within a category.
			 * If the string given can not be resolved as a loc string, then we will check if there is an existing group whose name matches the raw string.
			 * If this field is omitted, or there is no group whose name matches the loc string or the raw string, this block will be placed standalone in the given category.
			 */
			category?: CreativeGroup
		}

		/**
		 * ## Destroy Time
		 *
		 * Sets the destroy time property for the block.
		 * Greater numbers result in greater mining times.
		 * Time is measured in seconds with base equipment.
		 *
		 * @default 0.0
		 */
		'minecraft:destroy_time'?: number

		/**
		 * ## Display Name
		 *
		 * Specifies the language file key that maps to what text will be displayed when you hover over the block.
		 * Key is limited to 256 characters.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:display_name'?: string

		/**
		 * ## Explosion Resistance
		 *
		 * Sets the explosion resistance for this block.
		 *
		 * @default 0.0
		 */
		'minecraft:explosion_resistance'?: number

		/**
		 * ## Flammable
		 *
		 * Describes the flammable properties for this block.
		 */
		'minecraft:flammable'?: {
			/**
			 * ### Burn Odds
			 *
			 * How likely the block will be destroyed by flames when on fire.
			 * Value must be greater than or equal to 0.
			 *
			 * @default 0
			 */
			burn_odds?: number
			/**
			 * ### Flame Odds
			 *
			 * How likely the block will catch flame when next to a fire.
			 * Value must be greater than or equal to 0.

			 * @default 0
			 */
			flame_odds?: number
		}

		/**
		 * ## Friction
		 *
		 * Property describing the friction for this block in a range of `[0.1, 1.0]`.
		 * Friction affects an entity's movement speed when it travels on the block.
		 * Greater value results in less friction.
		 *
		 * @default 0.6
		 */
		'minecraft:friction'?: number

		/**
		 * ## Geometry
		 *
		 * The geometry description identifier to use,
		 * this identifier must match an existing geometry identifier in any of the currently loaded resource packs.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:geometry'?: string

		/**
		 * ## Loot
		 *
		 * The path to the loot table, relative to the behavior pack.
		 * Path string is limited to 256 characters.
		 */
		'minecraft:loot'?: string

		/**
		 * ## Map Color
		 *
		 * Sets the color of the block when rendered to a map.
		 * The color is represented as a hex value in the format "#RRGGBB".
		 * May also be expressed as an array of [R, G, B] from 0 to 255.
		 *
		 * @default #RRGGBB
		 */
		'minecraft:map_color'?: string

		/**
		 * ## Material Instances
		 *
		 * The material instances for a block.
		 * Maps face or material_instance names in a geometry file to an actual material instance.
		 * Material instance can either be a full material instance or a name to another already defined instance.
		 * Limited to 64 instances.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:material_instances'?: {
			/**
			 * ### Material Instance
			 *
			 * A material instance definition to map to a material instance in a geometry file.
			 * The material instance '*' will be used for any materials that don't have a match.
			 */
			[key: string]: {
				/**
				 * #### Ambient Occlusion
				 *
				 * Should this material have ambient occlusion applied when lighting.
				 *
				 * @default true
				 */
				ambient_occlusion?: boolean
				/**
				 * #### Face Dimming
				 *
				 * Should this material be dimmed by the direction it's facing.
				 *
				 * @default true
				 */
				face_dimming?: boolean
				/**
				 * #### Render Method
				 *
				 * The render method to use.
				 *
				 * @default 'opaque'
				 */
				render_method?:
					| 'opaque'
					| 'double_sided'
					| 'blend'
					| 'alpha_test'
				/**
				 * #### Texture
				 *
				 * Texture name for the material.
				 */
				texture?: string
			}
		}

		/**
		 * ## Part Visibility
		 *
		 * Maps bone names in a geometry file to a condition that turns their rendering on/off.
		 * fThe condition should be a Molang query that uses block properties to determine `true/false`.
		 * Supported queries include `"has_block_property"`, `"block_property"`, and other queries that can evaluate without knowledge of the block's in-game positional or player affected data.
		 *
		 * @requires Upcoming Creator Features
		 */
		'minecraft:part_visibility'?: {
			/**
			 * ### Rules
			 *
			 * The rules to apply to specific bones.
			 */
			rules?: {
				[key: string]: string
			}
		}

		/**
		 * ## Placement Filter
		 *
		 * Sets rules for under what conditions the block can be placed/survive.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:placement_filter'?: {
			/**
			 * ### Conditions
			 *
			 * List of conditions where the block can be placed/survive. Limited to 64 conditions.
			 */
			conditions?: {
				/**
				 * #### Allowed Faces
				 *
				 * List of directions. Limited to 6 faces.
				 */
				allowed_faces?: (
					| 'north'
					| 'east'
					| 'south'
					| 'west'
					| 'up'
					| 'down'
				)[]
				/**
				 * #### Block Filter
				 *
				 * List of blocks (can use tags to specify them) that this block can be placed against in the allowed_faces direction.
				 * Limited to 64 blocks.
				 */
				block_filter?: string[]
			}
		}

		/**
		 * ## Random Ticking
		 *
		 * Triggers the specified event randomly based on the random tick speed gamerule.
		 * The random tick speed determines how often blocks are updated. Some other examples of game mechanics that use random ticking are crop growth and fire spreading.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:random_ticking'?: {
			/**
			 * ### On Tick
			 *
			 * The event that will be triggered on random ticks.
			 */
			on_tick?: {
				/**
				 * #### Condition
				 *
				 * A condition using Molang queries that results to true/false.
				 * If true on the random tick, the event will be triggered.
				 * If false on the random tick, the event will not be triggered.
				 *
				 * @default '1'
				 */
				condition?: string
				/**
				 * #### Event
				 *
				 * The event that will be triggered.
				 *
				 * @default 'set_block_property'
				 */
				event?: string
				/**
				 * #### Target
				 *
				 * The target of the event executed by the block.
				 *
				 * @default 'self'
				 */
				target?: string
			}
		}

		/**
		 * ## Rotation
		 *
		 * This is the block's rotation around the center of the cube in degrees.
		 * The rotation order is `[x, y, z]`. Angles need to be in factors of 90.
		 *
		 * @default [0, 0, 0]
		 * @requires Holiday Creator Features
		 */
		'minecraft:rotation'?: [number, number, number]

		/**
		 * ## Ticking
		 *
		 * Triggers the specified event, either once, or at a regular interval equal to a number of ticks randomly chosen from the range provided.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:ticking'?: {
			/**
			 * ### Looping
			 *
			 * If false, the event will only be triggered once, after a delay equal to a number of ticks randomly chosen from the range.
			 * If true, the event will loop, and each interval between events will be equal to a number of ticks randomly chosen from the range.
			 *
			 * @default true
			 */
			looping?: boolean
			/**
			 * ### Range
			 *
			 * The Range between which the component will trigger his event.
			 *
			 * @default [10, 10]
			 */
			range?: [number, number]
			/**
			 * ### On Tick
			 *
			 * The event that will be triggered once or on an interval.
			 */
			on_tick?: {
				/**
				 * #### Condition
				 *
				 * A condition using Molang queries that results to true/false.
				 * If true on the scheduled tick, the event will be triggered.
				 * If false on the scheduled tick, the event will not be triggered.
				 *
				 * @default '1'
				 */
				condition?: string
				/**
				 * #### Event
				 *
				 * The event that will be triggered.
				 *
				 * @default 'set_block_property'
				 */
				event?: string
				/**
				 * #### Target
				 *
				 * The target of the event executed by the block.
				 *
				 * @default 'self'
				 */
				target?: string
			}
		}

		/**
		 * ## Unit Cube
		 *
		 * Specifies that a unit cube is to be used with tessellation.
		 *
		 * @requires Holiday Creator Features
		 */
		'minecraft:unit_cube'?: {}

		/**
		 * ## Unwalkable
		 *
		 * Sets the block as unwalkable.
		 * Mobs would not attempt to path over top of it when the value is set to true.
		 *
		 * @default false
		 */
		'minecraft:unwalkable'?: boolean
	}

	interface BlockTemplate {
		/**
		 * # Namespace
		 *
		 * The project namespace defined in `config.json`.
		 */
		namespace?: string

		/**
		 * # Format Version
		 *
		 * Specifies the version of the game this entity was made in.
		 * If the version is lower than the current version,
		 * any changes made to the block in the vanilla version will be applied to it.
		 */
		formatVersion: (template: FormatVersion) => void

		/**
		 * # Description
		 *
		 * Defines the description of the block.
		 */
		description: (template: Description) => void

		/**
		 * # Components
		 *
		 * Defines the components of the block.
		 */
		components: (template: Components) => void
	}
}

declare module 'volars' {
	/**
	 * Defines a new block based on the given template.
	 */
	// @ts-expect-error
	async function defineBlock(
		fn: (template: BlockTemplate) => void
	): Promise<Object>
}
export {}
