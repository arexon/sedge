export type FormatVersion = '1.16.100'

export interface Description {
	identifier: string
	properties?: {
		[key: `${string}:${string}`]: (string | boolean | number)[]
	}
}

export interface BlockTemplate {
	namespace?: string

	formatVersion: (data: FormatVersion) => void
	description: (data: Description) => void
}
