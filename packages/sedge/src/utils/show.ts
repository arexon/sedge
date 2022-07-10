import { blue, cyan } from 'colorette'
import { logger } from './logger'
import { version } from '../../package.json'
import type { CommandMeta } from '../commands'

export function showHelp(meta?: CommandMeta): void {
	const sections: string[] = []

	if (meta?.usage) {
		sections.push(`Usage: ${blue(meta.usage)}`)
	}

	if (meta?.description) {
		sections.push(`${cyan('>')} ${meta.description}`)
	}

	sections.push(
		`Use ${blue(
			'npx sedge [command] --help'
		)} to see info about each command`
	)

	logger.info(sections.join('\n\n') + '\n')
}

export function showBanner() {
	logger.start(blue(`Atropa CLI v${version}`))
}
