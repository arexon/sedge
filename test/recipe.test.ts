import { describe, expect, it } from 'vitest'
import recipe from '#playground/BP/recipes/radio.recipe'

describe('define recipe', () => {
	it('returns a valid recipe object', () => {
		expect(recipe).toMatchSnapshot()
	})
})
