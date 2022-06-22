export type BlockCollision = {
	/**
	 * ## Block Collision
	 *
	 * Describes the collision of the block with entities and actors.
	 * If set to false, it disables the collision of the block with entities.
	 * An origin of `[-8.0, 0.0, -8.0]` with a size of `[16, 16, 16]` is a unit cube.
	 *
	 * @requires Holiday Creator Features
	 */
	block_collision?:
		| {
				/**
				 * ### Origin
				 *
				 * Minimal position Bounds of the collision box.
				 * Origin is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
				 *
				 * @default [-8.0, 0.0, -8.0]
				 */
				origin?: [number, number, number]

				/**
				 * ### Size
				 *
				 * Size of each side of the collision box.
				 * Size is specified as `[x, y, z]`. Origin + size must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
				 *
				 * @default [16.0, 16.0, 16.0]
				 */
				size?: [number, number, number]
		  }
		| boolean
}
