import { FormatVersion } from '../FormatVersion'
import { Description, Properties } from './Description'
import { Components_1_16_0 } from './v1.16.0'
import { Components_1_16_100 } from './v1.16.100'
import { Components_1_18_10 } from './v1.18.10'
import { Components_1_18_30 } from './v1.18.30'
import { Components_1_19_10 } from './v1.19.10'

export interface BlockTemplate<Version extends FormatVersion> {
	/**
	 * # Namespace
	 *
	 * The project namespace defined in `config.json`.
	 */
	namespace: string

	/**
	 * # Description
	 *
	 * The description sets required block information.
	 */
	description: (
		template: Version extends '1.16.0'
			? Description
			: Description & Properties
	) => void

	/**
	 * # Compnoents
	 *
	 * Components are used to describe the block's attributes and behavior.
	 */
	components: (
		template: Version extends '1.16.0'
			? Components_1_16_0
			: Version extends '1.16.100'
			? Components_1_16_100
			: Version extends '1.18.10'
			? Components_1_18_10
			: Version extends '1.18.30'
			? Components_1_18_30
			: Version extends '1.19.10'
			? Components_1_19_10
			: never
	) => void
}
