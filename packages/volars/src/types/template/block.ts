type FormatVersion = string

interface Description {
	identifier: string
	properties?: {
		[key: `${string}:${string}`]: (string | boolean | number)[]
	}
}

interface Components {}

export interface BlockTemplate {
	namespace?: string
	formatVersion: (template: FormatVersion) => void
	description: (template: Description) => void
	components: (template: Components) => void
}
