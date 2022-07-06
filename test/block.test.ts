import { describe, expect, it } from 'vitest'
import block from '#playground/BP/blocks/radio.block'

describe('define block', () => {
	it('returns a valid block object', () => {
		expect(block).toMatchSnapshot()
	})
})
