export type CollisionBox = {
	/**
	 * ## Collision Box
	 *
	 * Defines the area of the block that collides with entities.
	 * If set to true, default values are used.
	 * If set to false, the block's collision with entities is disabled.
	 * If this component is omitted, default values are used.
	 */
	collision_box?:
		| {
				/**
				 * ### Size
				 *
				 * Size of each side of the box of the block.
				 *
				 * @default [16.0, 16.0, 16.0]
				 */
				size: [number, number, number]

				/**
				 * ### Origin
				 *
				 * Minimal position bounds of the collision box.
				 *
				 * @default [8.0, 0.0, 8.0]
				 */
				origin: [number, number, number]
		  }
		| false
}
