import { FilterSubject } from '../../general/FilterSubject'

export type Die = {
	/**
	 * ## Die
	 *
	 * Kill target. If target is self and this is run from a block then destroy the block.
	 *
	 * @default 'self'
	 */
	die?: FilterSubject
}
