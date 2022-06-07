import { logger } from './logger'

export const handleError = (message: unknown) => {
	logger.error(message)

	process.exit(1)
}
