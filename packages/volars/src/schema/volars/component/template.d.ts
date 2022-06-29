import type { FormatVersion } from '../../vanilla/formatVersion'
import type { BlockTemplate } from '../block/template'

type ComponentFormat = `${'block'}@${FormatVersion}`

type ComponentTemplate<Format extends ComponentFormat> =
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
		: never

export { ComponentFormat, ComponentTemplate }
