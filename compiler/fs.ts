import { dirname, extname, resolve } from 'path';
import { GameElementResult } from '../core/elements/game_element.ts';
import { toExtension } from './path.ts';

export interface SedgeFileSystem {
	import(path: string): Promise<any>;
	readTextFileSync(path: string): string;
	removeSync(path: string): void;
	statSync(path: string): Deno.FileInfo;
	readJsonFileSync(path: string): Record<string, any>;
	outputTextFileSync(path: string, data: string): void;
	outputJsonFileSync(
		path: string,
		data: Record<string, any>,
		minify: boolean,
	): void;
	outputModule(
		path: string,
		result: GameElementResult<Record<string, any> | string>,
		minify: boolean,
	): void;
	outputAsset(
		path: string,
		data: any,
		minify: boolean,
	): void;
}

export const sedgeFileSystem: SedgeFileSystem = {
	import: (path) => import(path),
	readTextFileSync: (path) => Deno.readTextFileSync(resolve(path)),
	removeSync: (path) => Deno.removeSync(resolve(path)),
	statSync: (path) => Deno.lstatSync(path),
	readJsonFileSync: (path) => JSON.parse(Deno.readTextFileSync(path)),
	outputTextFileSync: (path, data) => {
		Deno.mkdirSync(dirname(resolve(path)), { recursive: true });
		Deno.writeTextFileSync(resolve(path), data);
	},
	outputJsonFileSync: (path, data, minify) => {
		sedgeFileSystem.outputTextFileSync(
			path,
			JSON.stringify(data, undefined, minify ? undefined : '\t'),
		);
	},
	outputModule: (path, result, minify) => {
		if (
			result.extension === '.json' ||
			typeof result.data === 'object'
		) {
			return sedgeFileSystem.outputJsonFileSync(
				toExtension(path, '.json'),
				result.data as Record<string, any>,
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
