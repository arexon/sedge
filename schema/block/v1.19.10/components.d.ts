interface CollisionBox {
	/**
	 * ## Collision Box
	 * Defines the area of the block that collides with entities.
	 * If set to true, default values are used.
	 * If set to false, the block's collision with entities is disabled.
	 * If this component is omitted, default values are used.
	 */
	collision_box?:
		| {
			/**
			 * ### Size
			 * Size of each side of the box of the block.
			 * @default [16.0, 16.0, 16.0]
			 */
			size: [number, number, number];
			/**
			 * ### Origin
			 * Minimal position bounds of the collision box.
			 * @default [8.0, 0.0, 8.0]
			 */
			origin: [number, number, number];
		}
		| false;
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
		 * ### Table Name
		 * Specifies the language file key that maps to what text will be displayed in the UI of this table.
		 * If the string given can not be resolved as a loc string, the raw string given will be displayed.
		 * If this field is omitted, the name displayed will default to the name specified in the `"display_name"` component.
		 */
		table_name?: string;
		/**
		 * ### Grid Size
		 * Recipe grid size.
		 */
		grid_size?: 3;
		/**
		 * ### Crafting Tags
		 * Defines the tags recipes should define to be crafted on this table.
		 * Limited to 64 tags.
		 * Each tag is limited to 64 characters.
		 */
		crafting_tags?: string[];
	};
}

interface Flammable {
	/**
	 * ## Flammable
	 * Describes the flammable properties for this block.
	 * If set to true, default values are used.
	 * If set to false, this block will not be able to catch on fire.
	 * If this component is omitted, the block will not be able to catch on fire naturally from neighbors or lava, but it can still be directly ignited, and that fire will be able to spread to neighbor blocks.
	 */
	flammable?:
		| {
			/**
			 * ### Catch Chance Modifier
			 * A modifier affecting the chance that this block will catch flame when next to a fire.
			 * Values are greater than or equal to 0, with a higher number meaning more likely to catch on fire.
			 * @default 5
			 */
			catch_chance_modifier?: number;
			/**
			 * ### Destroy Chance Modifier
			 * How likely the block will be destroyed by flames when on fire.
			 * Value must be greater than or equal to 0.
			 * @default 20
			 */
			destroy_chance_modifier?: number;
		}
		| boolean;
}

interface LightDampening {
	/**
	 * ## Light Dampening
	 * The amount that light will be dampened when it passes through the block, in a range (0-15).
	 * Higher value means the light will be dampened more.
	 * @default 15
	 */
	light_dampening?: number;
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
		conditions?: {
			[key: string]: string;
		};
	};
}

interface QueuedTicking {
	/**
	 * ## Queued Ticking
	 * Triggers the specified event, either once, or at a regular interval equal to a number of ticks randomly chosen from the interval_range provided.
	 */
	queued_ticking?: {
		/**
		 * ### Looping
		 * Does the event loop.
		 * If false, the event will only be triggered once, after a delay equal to a number of ticks randomly chosen from the range.
		 * If true, the event will loop, and each interval between events will be equal to a number of ticks randomly chosen from the range.
		 * @default true
		 */
		looping?: boolean;
		/**
		 * ### Interval Range
		 * The Range between which the component will trigger this event.
		 * @default [10, 10]
		 */
		interval_range?: [number, number];
		/**
		 * ### On Tick
		 * The event that will be triggered once or on an interval.
		 */
		on_tick?: Event;
	};
}

export {
	CollisionBox,
	CraftingTable,
	Flammable,
	LightDampening,
	PartVisibility,
	QueuedTicking,
};
