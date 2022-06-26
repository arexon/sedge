import { EffectNames } from './EffectNames'

export type Effect = {
	/**
	 * ### Amplifier
	 *
	 * The amplifier for the effect.
	 *
	 * @default 0
	 */
	amplifier?: number

	/**
	 * ### Duration
	 *
	 * The time duration in seconds of the effect.
	 *
	 * @default 0.0
	 */
	duration?: number

	/**
	 * ### Effect
	 *
	 * The effect to apply.
	 */
	effect: EffectNames

	/**
	 * ### Visible
	 *
	 * Whether to show effect particles.
	 *
	 * @default true
	 */
	visible?: boolean

	/**
	 * ### Display On Screen Animation
	 *
	 * Whether to show an on screen effect icon animation upon applying the effect.
	 */
	display_on_screen_animation?: boolean
}
