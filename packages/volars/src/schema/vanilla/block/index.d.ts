import type { FormatVersion } from '../formatVersion'
import type { Template_1_16_0 } from './v1.16.0'
import type { Template_1_16_100 } from './v1.16.100'
import type { Template_1_18_10 } from './v1.18.10'
import type { Template_1_18_30 } from './v1.18.30'
import type { Template_1_19_10 } from './v1.19.10'

type BlockTemplate<Version extends FormatVersion> = Version extends '1.16.0'
	? Template_1_16_0
	: Version extends '1.16.100'
	? Template_1_16_100
	: Version extends '1.18.10'
	? Template_1_18_10
	: Version extends '1.18.30'
	? Template_1_18_30
	: Version extends '1.19.10'
	? Template_1_19_10
	: never

export { BlockTemplate }
