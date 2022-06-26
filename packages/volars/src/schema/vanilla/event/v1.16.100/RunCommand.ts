import { FilterSubject } from '../../general/FilterSubject'

export type RunCommand = {
	/**
	 * ## Run Command
	 *
	 * Triggers a slash command or a list of slash commands.
	 */
	run_command?: {
		/**
		 * ### Command
		 *
		 * Slash command to run.
		 */
		command: string | string[]

		/**
		 * ### Target
		 *
		 * The target context to execute against.
		 *
		 * @default 'self'
		 */
		target?: FilterSubject
	}
}
