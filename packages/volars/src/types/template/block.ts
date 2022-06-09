type FormatVersion = '1.16.100'

interface Description {
	identifier: string
	properties?: {
		[key: `${string}:${string}`]: (string | boolean | number)[]
	}
}

export interface BlockTemplate {
	namespace?: string
	formatVersion: (template: FormatVersion) => void
	description: (template: Description) => void
}
