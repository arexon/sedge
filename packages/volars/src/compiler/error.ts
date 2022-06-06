import { error } from './console'

export const handleError = (message: unknown) => {
	error(message)

	process.exit(1)
}
