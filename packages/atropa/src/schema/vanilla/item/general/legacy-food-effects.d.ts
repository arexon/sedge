import type { EffectNames } from '../../general/effect'

interface LegacyFoodEffects {
	/**
	 * ## Name
	 *
	 * The name of the effect.
	 */
	name?: EffectNames

	/**
	 * ## Chance
	 *
	 * The chance of the effect being applied.
	 */
	chance?: number

	/**
	 * ## Duration
	 *
	 * The time duration in seconds of the effect.
	 */
	duration?: number

	/**
	 * ## Amplifier
	 *
	 * The amplifier of the effect.
	 */
	amplifier?: number

	/**
	 * ## Visible
	 *
	 * Whether or not the effect particles are visible.
	 */
	visible?: 0 | 1

	/**
	 * ## Ambient
	 *
	 * Whether or not the effect is ambient.
	 */
	ambient?: 0 | 1
}

export type { LegacyFoodEffects }
