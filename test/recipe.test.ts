import { describe, expect, it } from 'vitest'
import recipe from '#playground/BP/recipes/radio'

describe('define recipe', () => {
	it('returns a valid recipe object', () => {
		expect(recipe.data).toMatchInlineSnapshot(`
			{
			  "format_version": "1.12.0",
			  "minecraft:recipe_shaped": {
			    "description": {
			      "identifier": "test:recipe.radio",
			    },
			    "key": {
			      "#": {
			        "item": "minecraft:planks",
			      },
			    },
			    "pattern": [
			      "###",
			      "# #",
			      "# #",
			    ],
			    "result": {
			      "item": "test:radio",
			    },
			    "tags": [
			      "crafting_table",
			    ],
			  },
			}
		`)
	})
})
