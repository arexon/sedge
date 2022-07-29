import { logger } from './logs'

export function tryCatch<T>(fn: () => T, errorMessage: string): T {
	try {
		return fn()
	} catch (error) {
		logger.error(`${errorMessage}: ${error}`)
		process.exit(1)
	}
}
