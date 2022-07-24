import type { BlockFormatVersion, BlockTemplate } from '../block'
import type { ItemFormatVersion, ItemTemplate } from '../item'

type ComponentBlockFormat = `block@${BlockFormatVersion}`
type ComponentItemFormat = `item@${ItemFormatVersion}`
type ComponentFormat = ComponentBlockFormat | ComponentItemFormat

type ComponentTemplate<Format extends ComponentFormat> = Omit<
	Format extends 'block@1.16.0'
		? BlockTemplate<'1.16.0'>
		: Format extends 'block@1.16.100'
		? BlockTemplate<'1.16.100'>
		: Format extends 'block@1.18.10'
		? BlockTemplate<'1.18.10'>
		: Format extends 'block@1.18.30'
		? BlockTemplate<'1.18.30'>
		: Format extends 'block@1.19.10'
		? BlockTemplate<'1.19.10'>
		: Format extends 'block@1.19.20'
		? BlockTemplate<'1.19.20'>
		: Format extends 'item@1.10.0'
		? ItemTemplate<'1.10.0'>
		: Format extends 'item@1.16.100'
		? ItemTemplate<'1.16.100'>
		: Format extends 'item@1.17.20'
		? ItemTemplate<'1.17.20'>
		: Format extends 'item@1.18.10'
		? ItemTemplate<'1.18.10'>
		: Format extends 'item@1.19.0'
		? ItemTemplate<'1.19.0'>
		: never,
	'use'
>

export type { ComponentFormat, ComponentTemplate }
