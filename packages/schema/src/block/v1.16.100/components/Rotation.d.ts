export type Rotation = {
	/**
	 * ## Rotation
	 *
	 * This is the block's rotation around the center of the cube in degrees.
	 * The rotation order is `x-y-z`. Angles need to be in factors of 90.
	 *
	 * @default [0, 0, 0]
	 * @requires Holiday Creator Features
	 */
	rotation?: [number, number, number]
}
