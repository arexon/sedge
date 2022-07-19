import { describe, expect, it } from 'vitest'
import item from '#playground/BP/items/key'

describe('define item', () => {
	it('returns a valid item object', () => {
		expect(item).toMatchInlineSnapshot(`
			{
			  "format_version": "1.19.0",
			  "minecraft:item": {
			    "components": {
			      "allow_off_hand": true,
			      "display_name": {
			        "value": "key",
			      },
			      "on_use_on": {
			        "event": "test:say_hi",
			      },
			    },
			    "description": {
			      "identifier": "test:key",
			    },
			    "events": {
			      "test:say_hi": {
			        "run_command": {
			          "command": "say hi",
			          "target": "player",
			        },
			      },
			    },
			  },
			}
		`)
	})
})
