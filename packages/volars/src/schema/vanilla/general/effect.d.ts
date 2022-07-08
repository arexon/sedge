type EffectNames =
	| 'absorption'
	| 'bad_omen'
	| 'blindness'
	| 'conduit_power'
	| 'darkness'
	| 'fatal_poison'
	| 'fire_resistance'
	| 'haste'
	| 'heal'
	| 'health_boost'
	| 'hunger'
	| 'instant_damage'
	| 'instant_health'
	| 'invisibility'
	| 'jump_boost'
	| 'levitation'
	| 'mining_fatigue'
	| 'nausea'
	| 'night_vision'
	| 'poison'
	| 'regeneration'
	| 'resistance'
	| 'saturation'
	| 'slow_falling'
	| 'slowness'
	| 'speed'
	| 'strength'
	| 'village_hero'
	| 'water_breathing'
	| 'weakness'
	| 'wither'

interface Effect {
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

export type { Effect, EffectNames }
