export const blockTypes = `declare global {
	type FormatVersion = '1.16.100'

	interface Description {
		/**
		 * The identifier for this block.
		 * The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla block.
		 */
		identifier: string
		/**
		 * Define block properties and their possible values.
		 */
		properties?: {
			[key: \`\${string}:\${string}\`]: (string | boolean | number)[]
		}
	}

	interface BlockTemplate {
		namespace?: string
		/**
		 * Specifies the version of the game this entity was made in.
		 * If the version is lower than the current version,
		 * any changes made to the block in the vanilla version will be applied to it.
		 */
		formatVersion: (data: FormatVersion) => void
		/**
		 * Defines the description of the block.
		 */
		description: (data: Description) => void
	}
}

declare module 'volars' {
	/**
	 * Defines a new block based on the given template.
	 */
	// @ts-expect-error
	const defineBlock: (fn: (template: BlockTemplate) => void) => Promise<Object>
}

export {}`
