export const handleError = (error: unknown) => {
	console.error(error)

	process.exitCode = 1
}
