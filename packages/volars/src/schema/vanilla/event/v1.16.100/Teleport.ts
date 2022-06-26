import { FilterSubject } from '../../general/FilterSubject'

export type Teleport = {
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
		target?: FilterSubject
	}
}
