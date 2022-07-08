import { describe, expect, it } from 'vitest'
import lootTable from '#playground/BP/loot_tables/radio.loot'

describe('define loot table', () => {
	it('returns a valid loot table object', () => {
		expect(lootTable).toMatchInlineSnapshot(`
			{
			  "pools": [
			    {
			      "entries": {
			        "name": "test:table",
			        "type": "item",
			        "weight": 1,
			      },
			      "rolls": 1,
			    },
			  ],
			}
		`)
	})
})
