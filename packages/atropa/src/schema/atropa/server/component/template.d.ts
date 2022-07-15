import type { BlockTemplate, BlockFormatVersion } from '../block'
import type { LootTableFunction, RecipeFunction } from './functions'

type ComponentFormat = `${'block'}@${BlockFormatVersion}`

type ComponentTemplate<Format extends ComponentFormat> = Omit<
	Format extends 'block@1.16.0'
		? BlockTemplate<'1.16.0'>
		: Format extends 'block@1.16.100'
		? BlockTemplate<'1.16.100'> & LootTableFunction & RecipeFunction
		: Format extends 'block@1.18.10'
		? BlockTemplate<'1.18.10'> & LootTableFunction & RecipeFunction
		: Format extends 'block@1.18.30'
		? BlockTemplate<'1.18.30'> & LootTableFunction & RecipeFunction
		: Format extends 'block@1.19.10'
		? BlockTemplate<'1.19.10'> & LootTableFunction & RecipeFunction
		: never,
	'use'
>

export type { ComponentFormat, ComponentTemplate }
