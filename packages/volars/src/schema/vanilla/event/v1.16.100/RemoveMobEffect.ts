import { Effect } from '../../general/Effect'
import { EffectNames } from '../../general/EffectNames'
import { FilterSubject } from '../../general/FilterSubject'

export type RemoveMobEffect = {
	/**
	 * ## Remove Mob Effect
	 *
	 * Removes mob effect from target.
	 */
	remove_mob_effect?: {
		/**
		 * ### Effect
		 *
		 * The mob effect to remove. Use `all` to remove all mob effects from target.
		 */
		effect: EffectNames | 'all'

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
