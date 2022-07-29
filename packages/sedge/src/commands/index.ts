export const commands = {
	add: async () => (await import('./add')).default,
	build: async () => (await import('./build')).default,
	clean: async () => (await import('./clean')).default,
	dev: async () => (await import('./dev')).default,
	help: async () => (await import('./help')).default,
	world: async () => (await import('./world')).default
}

export type CommandName = keyof typeof commands

export interface CommandMeta {
	name: string
	usage: string
	description: string
}

export function defineCommand(command: Command): Command {
	return command
}

interface Command {
	meta: CommandMeta
	run: (args: Record<string, any>) => Promise<void> | void
}
