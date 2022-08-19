import { fromFileUrl } from 'path';
import { logger } from './logger.ts';

export function tryCatch<T>(
	fn: () => T,
): T {
	try {
		return fn();
	} catch (error) {
		logger.error(`${error} at (${getCallerFilePath()})`);
		Deno.exit(1);
	}
}

function getCallerFilePath(): string {
	const { stack } = new Error();

	if (!stack) return '';

	const stackLines = stack.split('\n');
	const path = stackLines[stackLines.length - 1].trim().split(' ')[1];
	return fromFileUrl(path);
}
