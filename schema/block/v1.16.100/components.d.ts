import { EventTrigger } from '../../event/v1.16.100/triggers.d.ts';
import { CreativeGroup, ItemGroup } from '../../general/inventory.d.ts';

interface BreakOnPush {
	/**
	 * ## Break On Push
	 * When pushed by a piston the block breaks.
	 */
	breakonpush?: boolean;
}

interface Breathability {
	/**
	 * ## Breathability
	 * The breathing type of this block that affects the breathing state of mobs when they have their breathing points inside this block.
	 * @default 'solid'
	 * @requires Holiday Creator Features
	 */
	breathability?: 'solid' | 'air';
}

interface CraftingTable {
	/**
	 * ## Crafting Table
	 * Describes the component of a custom crafting table.
	 * This component supports only `"recipe_shaped"` and `"recipe_shapeless"` typed recipes and not others like `"recipe_furnace"` or `"recipe_brewing_mix"`.
	 * If there are two recipes for one item, the recipe book will pick the first that was parsed.
	 * If two input recipes are the same, crafting may assert and the resulting item may vary.
	 * @requires Holiday Creator Features
	 */
	crafting_table?: {
		/**
		 * ### Custom Description
		 * Specifies the language file key that maps to what text will be displayed in the UI of this table.
		 * If the string given can not be resolved as a loc string, the raw string given will be displayed.
		 * If this field is omitted, the name displayed will default to the name specified in the `"display_name"` component.
		 * If this block has no `"display_name"` component, the name displayed will default to the name of the block.
		 */
		custom_description?: string;
		/**
		 * ### Grid Size
		 * Recipe grid size.
		 */
		grid_size?: 3;
		/**
		 * ### Crafting Tags
		 * Defines the language file key that maps what text will be displayed in the UI of this table.
		 * If not specified, the name of the block will be used.
		 */
		crafting_tags?: string[];
	};
}

interface CreativeCategory {
	/**
	 * ## Creative Category
	 * Specifies the menu category and group for the block, which determine where this block is placed in the inventory and crafting table container screens.
	 * If this component is omitted, the block will not appear in the inventory or crafting table container screens.
	 * @requires Holiday Creator Features
	 */
	creative_category?: {
		/**
		 * ### Creative Group
		 * Determines which category this block will be placed under in the inventory and crafting table container screens.
		 * If omitted or `"none"` is specified, the block will not appear in the inventory or crafting table container screens.
		 */
		group?: CreativeGroup | ItemGroup;
		/**
		 * ### Category
		 * Specifies the language file key that maps to which expandable/collapsible group this block will be a part of within a category.
		 * If the string given can not be resolved as a loc string, then we will check if there is an existing group whose name matches the raw string.
		 * If this field is omitted, or there is no group whose name matches the loc string or the raw string, this block will be placed standalone in the given category.
		 */
		category?: CreativeGroup;
	};
}

interface DisplayName {
	/**
	 * ## Display Name
	 * Specifies the language file key that maps to what text will be displayed when you hover over the block.
	 * Key is limited to 256 characters.
	 * @requires Holiday Creator Features
	 */
	display_name?: string;
}

interface EntityCollision {
	/**
	 * ## Entity Collision
	 * Describes the collision of the block with entities and actors.
	 * If set to false, it disables the collision of the block with entities.
	 * An origin of `[-8.0, 0.0, -8.0]` with a size of `[16, 16, 16]` is a unit cube.
	 * @requires Holiday Creator Features
	 */
	entity_collision?:
		| {
			/**
			 * ### Origin
			 * Minimal position Bounds of the collision box.
			 * Origin is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
			 * @default [-8.0, 0.0, -8.0]
			 */
			origin?: [number, number, number];
			/**
			 * ### Size
			 * Size of each side of the collision box.
			 * Size is specified as `[x, y, z]`. Origin + size must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
			 * @default [16.0, 16.0, 16.0]
			 */
			size?: [number, number, number];
		}
		| false;
}

interface Geometry {
	/**
	 * ## Geometry
	 * The geometry description identifier to use.
	 * This identifier must match an existing geometry identifier in any of the currently loaded resource packs.
	 * @requires Holiday Creator Features
	 */
	geometry?: string;
}

interface Immovable {
	/**
	 * ## Immovable
	 * An immovable block cannot be pushed by pistons.
	 */
	immovable?: boolean;
}

interface MaterialInstances {
	/**
	 * ## Material Instances
	 * The material instances for a block.
	 * Maps face or material_instance names in a geometry file to an actual material instance.
	 * Material instance can either be a full material instance or a name to another already defined instance.
	 * Limited to 64 instances.
	 * @requires Holiday Creator Features
	 */
	material_instances?: {
		/**
		 * ### Material Instance
		 * A material instance definition to map to a material instance in a geometry file.
		 * The material instance '*' will be used for any materials that don't have a match.
		 */
		[
			key:
				| string
				| 'up'
				| 'down'
				| 'sides'
				| 'north'
				| 'east'
				| 'south'
				| 'west'
		]: {
			/**
			 * #### Ambient Occlusion
			 * Should this material have ambient occlusion applied when lighting.
			 * If true, shadows will be created around and underneath the block.
			 * @default true
			 */
			ambient_occlusion?: boolean;
			/**
			 * #### Face Dimming
			 * Should this material be dimmed by the direction it's facing.
			 * @default true
			 */
			face_dimming?: boolean;
			/**
			 * #### Render Method
			 * The render method to use.
			 * @default 'opaque'
			 */
			render_method?: 'opaque' | 'double_sided' | 'blend' | 'alpha_test';
			/**
			 * #### Texture
			 * Name of a texture from the `terrain_texture.json` file.
			 */
			texture?: string;
		};
	};
}

interface OnlyPistonPush {
	/**
	 * ## Only Piston Push
	 * Blocks with this component won't stick to sticky pistons.
	 */
	only_piston_push?: boolean;
}

interface PartVisibility {
	/**
	 * ## Part Visibility
	 * Sets conditions for when the block's different parts are visible.
	 * @requires Upcoming Creator Features
	 */
	part_visibility?: {
		/**
		 * ### Rules
		 * A JSON object that contains a list of key/value pairs that map from bone name in a geometry file (key) to a condition that turns their rendering on/off (value).
		 * The condition should be a Molang query that uses block properties to determine true/false.
		 * Supported queries include `'has_block_property'`, `'block_property'`, and other queries that can evaluate without knowledge of the block's in-game positional or player affected data.
		 */
		rules?: {
			[key: string]: string;
		};
	};
}

interface PickCollision {
	/**
	 * ## Pick Collision
	 * Describes the collision of the block for raycast and its outline.
	 * If set to false it disables the collision of the block with entities.
	 * An origin of `[-8.0, 0.0, -8.0]` with a size of `[16, 16, 16]` is a unit cube.
	 * @requires Holiday Creator Features
	 */
	pick_collision?:
		| {
			/**
			 * ### Origin
			 * Minimal position Bounds of the selection box.
			 * Origin is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
			 * @default [-8.0, 0.0, -8.0]
			 */
			origin: [number, number, number];
			/**
			 * ### Size
			 * Size of each side of the selection box.
			 * Size is specified as `[x, y, z]`. Origin + size must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
			 * @default [16.0, 16.0, 16.0]
			 */
			size: [number, number, number];
		}
		| false;
}

interface PlacementRules {
	/**
	 * ### Placement Rules
	 * List of conditions where the block can be placed/survive.
	 * Limited to 64 conditions.
	 */
	placement_rules?: {
		/**
		 * #### Allowed Faces
		 * List of directions. Limited to 6 faces.
		 */
		allowed_faces?: (
			| 'up'
			| 'down'
			| 'north'
			| 'east'
			| 'south'
			| 'west'
			| 'side'
			| 'all'
		)[];
		/**
		 * #### Block Filter
		 * List of blocks (can use tags to specify them) that this block can be placed against in the allowed_faces direction.
		 * Limited to 64 blocks.
		 */
		block_filter?: string[];
	};
}

interface PlacementFilter {
	/**
	 * ## Placement Filter
	 * Sets rules for under what conditions the block can be placed/survive.
	 * @requires Holiday Creator Features
	 */
	placement_filter?: PlacementRules | PlacementRules[];
}

interface PreventJumping {
	/**
	 * ## Prevent Jumping
	 * This component makes it so actors can't jump when walking on this block.
	 */
	prevent_jumping?: boolean;
}

interface RandomTicking {
	/**
	 * ## Random Ticking
	 * Triggers the specified event randomly based on the random tick speed gamerule.
	 * The random tick speed determines how often blocks are updated. Some other examples of game mechanics that use random ticking are crop growth and fire spreading.
	 * @requires Holiday Creator Features
	 */
	random_ticking?: {
		/**
		 * ### On Tick
		 * The event that will be triggered on random ticks.
		 */
		on_tick?: EventTrigger;
	};
}

interface Rotation {
	/**
	 * ## Rotation
	 * This is the block's rotation around the center of the cube in degrees.
	 * The rotation order is `x-y-z`. Angles need to be in factors of 90.
	 * @default [0, 0, 0]
	 * @requires Holiday Creator Features
	 */
	rotation?: [number, number, number];
}

interface Ticking {
	/**
	 * ## Ticking
	 * Triggers the specified event, either once, or at a regular interval equal to a number of ticks randomly chosen from the range provided.
	 * @requires Holiday Creator Features
	 */
	ticking?: {
		/**
		 * ### Looping
		 * Does the event loop.
		 * If false, the event will only be triggered once, after a delay equal to a number of ticks randomly chosen from the range.
		 * If true, the event will loop, and each interval between events will be equal to a number of ticks randomly chosen from the range.
		 * @default true
		 */
		looping?: boolean;
		/**
		 * ### Range
		 * The Range between which the component will trigger this event.
		 * @default [10, 10]
		 */
		range?: [number, number];
		/**
		 * ### On Tick
		 * The event that will be triggered once or on an interval.
		 */
		on_tick?: EventTrigger;
	};
}

interface UnitCube {
	/**
	 * ## Unit Cube
	 * Specifies that a unit cube is to be used with tessellation.
	 * @requires Holiday Creator Features
	 */
	unit_cube?: Record<string, never>;
}

interface Unwalkable {
	/**
	 * ## Unwalkable
	 * Sets the block as unwalkable.
	 * Mobs would not attempt to path over top of it when the value is set to true.
	 * @default false
	 */
	unwalkable?: boolean;
}

export {
	BreakOnPush,
	Breathability,
	CraftingTable,
	CreativeCategory,
	CreativeGroup,
	DisplayName,
	EntityCollision,
	Geometry,
	Immovable,
	MaterialInstances,
	OnlyPistonPush,
	PartVisibility,
	PickCollision,
	PlacementFilter,
	PlacementRules,
	PreventJumping,
	RandomTicking,
	Rotation,
	Ticking,
	UnitCube,
	Unwalkable,
};
