import { describe, expect, it } from 'vitest'
import lootTable from '#playground/BP/loot_tables/radio'

describe('define loot table', () => {
	it('returns a valid loot table object', () => {
		expect(lootTable.data).toMatchInlineSnapshot(`
			{
			  "pools": [
			    {
			      "entries": [
			        {
			          "name": "test:radio",
			          "type": "item",
			          "weight": 1,
			        },
			      ],
			      "rolls": 1,
			    },
			  ],
			}
		`)
	})
})
