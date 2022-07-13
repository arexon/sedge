import { describe, expect, it } from 'vitest'
import recipe from '#playground/BP/recipes/radio'

describe('define recipe', () => {
	it('returns a valid recipe object', () => {
		expect(recipe).toMatchInlineSnapshot(`
			{
			  "format_version": "1.12",
			  "minecraft:recipe_shaped": {
			    "description": {
			      "identifier": "test:recipe.radio",
			    },
			    "key": {
			      "A": {
			        "item": "minecraft:planks",
			      },
			      "B": {
			        "item": "minecraft:note",
			      },
			    },
			    "pattern": [
			      "A",
			      "B",
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
