import { FormatVersion } from '../FormatVersion'
import { Template_1_16_0 } from './v1.16.0'
import { Template_1_16_100 } from './v1.16.100'
import { Template_1_18_10 } from './v1.18.10'
import { Template_1_18_30 } from './v1.18.30'
import { Template_1_19_10 } from './v1.19.10'

export type BlockTemplate<Version extends FormatVersion> =
	Version extends '1.16.0'
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
