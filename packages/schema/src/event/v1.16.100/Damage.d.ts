import { DamageTypes } from '../../general/DamageTypes'
import { FilterSubject } from '../../general/FilterSubject'

export type Damage = {
	/**
	 * ## Damage
	 *
	 * Deals damage to the target.
	 */
	damage?: {
		/**
		 * ### Type
		 *
		 * The type of damage to deal.
		 */
		type: DamageTypes

		/**
		 * ### Amount
		 *
		 * The amount of damage to deal.
		 *
		 * @default 0
		 */
		amount?: number

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
