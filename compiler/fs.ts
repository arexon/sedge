import { dirname, extname } from 'path';
import { Result } from '../core/types.ts';
import { toExtension } from './path.ts';

export interface SedgeFileSystem {
	import(path: string, type?: 'json'): Promise<any>;
	readTextFileSync(path: string | URL): string;
	copyFileSync(fromPath: string | URL, toPath: string | URL): void;
	removeSync(path: string | URL): void;
	lstatSync(path: string | URL): Deno.FileInfo;

	readJsonFileSync(path: string): Record<string, any>;
	outputTextFileSync(path: string, data: string): void;
	outputJsonFileSync(
		path: string,
		data: Record<string, any>,
		minify: boolean,
	): void;
	outputModule(
		path: string,
		result: Result<any>,
		minify: boolean,
	): void;
	outputAsset(
		path: string,
		data: any,
		minify: boolean,
	): void;
}

export const sedgeFileSystem: SedgeFileSystem = {
	import: (path, type) => {
		if (type === 'json') return import(path, { assert: { type } });
		return import(path);
	},
	readTextFileSync: (path) => Deno.readTextFileSync(path),
	copyFileSync: (fromPath, toPath) => Deno.copyFileSync(fromPath, toPath),
	removeSync: (path) => Deno.removeSync(path),
	lstatSync: (path) => Deno.lstatSync(path),

	readJsonFileSync: (path) => JSON.parse(Deno.readTextFileSync(path)),
	outputTextFileSync: (path, data) => {
		Deno.mkdirSync(dirname(path), { recursive: true });
		Deno.writeTextFileSync(path, data);
	},
	outputJsonFileSync: (path, data, minify) => {
		sedgeFileSystem.outputTextFileSync(
			path,
			JSON.stringify(data, undefined, minify ? undefined : '\t'),
		);
	},
	outputModule: (path, result, minify) => {
		if (result.type === 'gameElement') {
			return sedgeFileSystem.outputJsonFileSync(
				toExtension(path, '.json'),
				result.data,
				minify,
			);
		}

		if (typeof result.data === 'object') {
			return sedgeFileSystem.outputJsonFileSync(
				toExtension(path, '.json'),
				result.data,
				minify,
			);
		} else {
			return sedgeFileSystem.outputTextFileSync(path, result.data);
		}
	},
	outputAsset: (path, data, minify) => {
		if (extname(path) === '.json') {
			sedgeFileSystem.outputJsonFileSync(path, JSON.parse(data), minify);
		} else {
			sedgeFileSystem.outputTextFileSync(path, data);
		}
	},
};
