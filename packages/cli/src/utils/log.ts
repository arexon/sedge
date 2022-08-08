import { logger } from '@sedge-core/shared'
import { blue, cyan } from 'colorette'
import { version } from '../../package.json'
import type { CommandMeta } from '../commands'

export function logHelp(meta?: CommandMeta): void {
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

export function logBanner() {
	logger.start(blue(`Sedge CLI v${version}`))
}