import { format } from 'datetime';
import { bgRed, bgYellow, bold, cyan, dim, green, red } from 'fmt/colors.ts';

interface Logger {
	clear(): void;
	log(...data: string[]): void;
	info(...data: string[]): void;
	success(...data: string[]): void;
	start(...data: string[]): void;
	warn(...data: string[]): void;
	error(...data: string[]): void;
}

export const logger = createLogger();

function createLogger(): Logger {
	return {
		clear: () => console.clear(),
		log: (...data) => console.log(formatData({ data })),
		info: (...data) =>
			console.log(formatData({ level: cyan(bold('i')), data })),
		success: (...data) =>
			console.log(formatData({ level: green(bold('✔')), data })),
		start: (...data) =>
			console.log(formatData({ level: green(bold('start')), data })),
		warn: (...data) =>
			console.warn(formatData({
				spaceOut: true,
				level: bgYellow(bold(' WARN ')),
				data,
			})),
		error: (...data) =>
			console.error(formatData({
				spaceOut: true,
				level: bgRed(bold(' ERROR ')),
				data,
			})),
	};
}

function formatData(options: {
	level?: string;
	spaceOut?: boolean;
	data: string[];
}): string {
	const { level = '', spaceOut = false, data } = options;
	const time = dim(format(new Date(), 'hh:mm:ss'));
	const templateRegex = /\[(.*?)\]|\((.*?)\)|\{(.*?)\}/g;
	const formattedData = data.map((x) => {
		// @ts-ignore - Deno typings don't seem to have string.replace overloads
		return x.replace(templateRegex, (_, p1, p2, p3) => {
			if (p1) return cyan(p1);
			if (p2) return dim(p2);
			if (p3) return red(p3);
		});
	});

	return [
		spaceOut ? '\n' : '',
		time,
		level ? ` ${level} ` : ' ',
		formattedData.join(' '),
		spaceOut ? '\n' : '',
	].join('');
}
