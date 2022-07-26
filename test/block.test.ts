import { describe, expect, it } from 'vitest'
import block from '#playground/BP/blocks/radio'

describe('define block', () => {
	it('returns a valid block object', () => {
		expect(block.data).toMatchInlineSnapshot(`
			{
			  "format_version": "1.19.10",
			  "minecraft:block": {
			    "components": {
			      "minecraft:display_name": "test:radio",
			      "minecraft:loot": "loot_tables/radio.loot.json",
			      "minecraft:on_interact": {
			        "condition": "q.is_sneaking",
			        "event": "test:toggle",
			      },
			    },
			    "description": {
			      "identifier": "test:radio",
			      "properties": {
			        "test:is_on": [
			          false,
			          true,
			        ],
			      },
			    },
			    "events": {
			      "test:toggle": {
			        "set_block_property": {
			          "test:is_on": "!q.block_property('test:is_on')",
			        },
			      },
			    },
			    "permutations": [
			      {
			        "components": {
			          "minecraft:geometry": "geometry.radio.off",
			        },
			        "condition": "q.block_property('test:is_on') == false",
			      },
			      {
			        "components": {
			          "minecraft:geometry": "geometry.radio.on",
			        },
			        "condition": "q.block_property('test:is_on') == true",
			      },
			    ],
			  },
			}
		`)
	})
})
