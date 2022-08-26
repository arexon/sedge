import { format } from 'datetime';
import { bgRed, bgYellow, bold, cyan, dim, green } from 'fmt/colors.ts';

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
	const time = dim(format(new Date(), 'hh:mm:ss'));

	return {
		clear: () => console.clear(),
		log: (...data) => console.log(formatData({ data, time })),
		info: (...data) => {
			return console.log(
				formatData({ level: cyan(bold('i')), data, time }),
			);
		},
		success: (...data) => {
			return console.log(
				formatData({ level: green(bold('✔')), data, time }),
			);
		},
		start: (...data) => {
			return console.log(
				formatData({ level: green(bold('start')), data, time }),
			);
		},
		warn: (...data) => {
			return console.log(formatData({
				spaceOut: true,
				level: bgYellow(bold(' WARN ')),
				data,
				time,
			}));
		},
		error: (...data) => {
			return console.log(formatData({
				spaceOut: true,
				level: bgRed(bold(' ERROR ')),
				data,
				time,
			}));
		},
	};
}

function formatData(options: {
	level?: string;
	spaceOut?: boolean;
	data: string[];
	time: string;
}): string {
	const { level = '', spaceOut = false, data, time } = options;
	const templateRegex = /\[(.*?)\]|\((.*?)\)/g;
	const formattedData = data.map((x) => {
		// @ts-ignore - Deno typings don't seem to have string.replace overloads
		return x.replace(templateRegex, (_, p1, p2) => {
			if (p1) return cyan(p1);
			if (p2) return dim(p2);
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
