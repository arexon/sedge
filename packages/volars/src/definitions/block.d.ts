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
		 * An origin of [-8.0, 0.0, -8.0] with a size of [16, 16, 16] is a unit cube.
		 */
		'minecraft:aim_ollision'?:
			| {
					origin: [number, number, number]
					size: [number, number, number]
			  }
			| boolean

		/**
		 * ## Block Collision
		 *
		 * Describes the collision of the block with entities and actors.
		 * If set to false, it disables the collision of the block with entities.
		 * An origin of `[-8.0, 0.0, -8.0]` with a size of `[16, 16, 16]` is a unit cube.
		 */
		'minecraft:block_collision'?:
			| {
					origin: [number, number, number]
					size: [number, number, number]
			  }
			| boolean

		/**
		 * ## Block Light Emission
		 *
		 * The amount of light this block will emit in a range `[0.0, 1.0]`.
		 */
		'minecraft:block_light_emission'?: number

		/**
		 * ## Block Light Filter
		 *
		 * The amount of light this block will filter out.
		 * Higher value means more light will be filtered out `(0 - 15)`.
		 */
		'minecraft:block_light_filter'?: number

		/**
		 * ## Breathability
		 *
		 * The breathing type of this block that affects the breathing state of mobs when they have their breathing points inside this block.
		 */
		'minecraft:breathability'?: 'air' | 'solid'

		/**
		 * ## Crafting Table
		 *
		 * Describes the component of a custom crafting table.
		 * This component supports only `"recipe_shaped"` and `"recipe_shapeless"` typed recipes and not others like `"recipe_furnace"` or `"recipe_brewing_mix"`.
		 * If there are two recipes for one item, the recipe book will pick the first that was parsed.
		 * If two input recipes are the same, crafting may assert and the resulting item may vary.
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
	function defineBlock(fn: (template: BlockTemplate) => void): Promise<Object>
}
export {}
