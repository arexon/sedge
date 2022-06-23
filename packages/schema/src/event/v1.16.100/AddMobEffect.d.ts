import { Effect } from '../../general/Effect'
import { FilterSubject } from '../../general/FilterSubject'

export type AddMobEffect = {
	/**
	 * ## Add Mob Effect
	 *
	 * Apply mob effect to target.
	 */
	add_mob_effect?: {
		/**
		 * ### Target
		 *
		 * Block or entity to target
		 *
		 * @default 'self'
		 */
		target?: FilterSubject
	} & Effect
}
