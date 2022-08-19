export function tryCatch<T>(
	fn: () => T,
	message: string,
): T {
	try {
		return fn();
	} catch (error) {
		throw new Error(`${message}: ${error}`);
	}
}
