export type FormatVersion = '1.16.100'

export interface Description {
	identifier: string
}

export interface BlockTemplate {
	namespace?: string

	formatVersion: (data: FormatVersion) => void
	description: (data: Description) => void
}
