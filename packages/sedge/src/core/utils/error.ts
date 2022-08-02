export function tryCatch<T>(fn: () => T, errorMessage: string): T {
	try {
		return fn()
	} catch (error) {
		throw new Error(`${errorMessage}: ${error}`)
	}
}
