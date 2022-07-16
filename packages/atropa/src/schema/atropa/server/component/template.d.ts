import type { BlockTemplate, BlockFormatVersion } from '../block'

type ComponentFormat = `${'block'}@${BlockFormatVersion}`

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
		: never,
	'use'
>

export type { ComponentFormat, ComponentTemplate }
