interface DestructibleByMining {
	/**
	 * ## Destructible By Mining
	 * Describes the destructible by mining properties for this block.
	 * If set to true, the block will have the default destroy time.
	 * If set to false, the block will be indestructible by mining.
	 * @requires Holiday Creator Features
	 */
	destructible_by_mining?:
		| {
				/**
				 * ### Seconds to Destroy
				 * Sets the number of seconds it takes to destroy the block with base equipment. Greater values will result in faster mining speeds.
				 * @default 0.0
				 */
				seconds_to_destroy: number
		  }
		| boolean
}

interface Friction {
	/**
	 * ## Friction
	 * Describes the friction for this block in a range of `(0.0-0.9)`.
	 * Friction affects an entity's movement speed when it travels on the block.
	 * Greater value results in more friction.
	 * @default 0.4
	 */
	friction?: number
}

interface LightEmission {
	/**
	 * ## Light Emission
	 * The amount of light this block will emit in a range `(0-15)`.
	 * Higher value means more light will be emitted.
	 * @default 0
	 */
	light_emission?: number
}

interface SelectionBox {
	/**
	 * ## Selection Collision
	 * Defines the area of the block that is selected by the player's cursor.
	 * If set to true, default values are used.
	 * If set to false, the block will not be selectable by the player's cursor.
	 * @requires Holiday Creator Features
	 */
	box_selection?:
		| {
				/**
				 * ### Size
				 * Size of each side of the selection box.
				 * Size is specified as `[x, y, z]`.
				 * Origin + size must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
				 * @default [16.0, 16.0, 16.0]
				 */
				size?: [number, number, number]
				/**
				 * ### Origin
				 * Minimal position Bounds of the selection box.
				 * Origin is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
				 * @default [-8.0, 0.0, -8.0]
				 */
				origin?: [number, number, number]
		  }
		| boolean
}

export type { DestructibleByMining, Friction, LightEmission, SelectionBox }
