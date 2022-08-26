import { dirname } from 'path';
import { Result } from '../core/types.ts';
import { SEDGE_NAMESPACE } from '../shared/mod.ts';
import { toExtension } from './path.ts';

export interface SedgeFileSystem {
	import(path: string, type?: 'json'): Promise<any>;
	readTextFileSync(path: string | URL): string;
	copyFileSync(fromPath: string | URL, toPath: string | URL): void;
	lstatSync(path: string | URL): Deno.FileInfo;
	outputTextFileSync(path: string, data: string): void;
	outputJsonFileSync(path: string, data: Record<string, any>): void;
	outputModule(path: string, result: Result<any>): void;
}

export const sedgeFileSystem: SedgeFileSystem = {
	import: (path, type) => {
		if (type === 'json') return import(path, { assert: { type } });
		return import(path);
	},
	readTextFileSync: (path) => Deno.readTextFileSync(path),
	copyFileSync: (fromPath, toPath) => Deno.copyFileSync(fromPath, toPath),
	lstatSync: (path) => Deno.lstatSync(path),
	outputTextFileSync: (path, data) => {
		Deno.mkdirSync(dirname(path), { recursive: true });
		Deno.writeTextFileSync(path, data);
	},
	outputJsonFileSync: (path, data) => {
		sedgeFileSystem.outputTextFileSync(
			path,
			JSON.stringify(data, null, '\t'),
		);
	},
	outputModule: (path, result) => {
		if (result.type === 'gameElement') {
			return sedgeFileSystem.outputJsonFileSync(
				toExtension(path, '.json'),
				result.data,
			);
		}

		if (typeof result.data === 'object') {
			return sedgeFileSystem.outputJsonFileSync(path, result.data);
		} else {
			return sedgeFileSystem.outputTextFileSync(path, result.data);
		}
	},
};

export const testFileSystem: SedgeFileSystem = {
	import: (_, type) => {
		if (type === 'json') {
			return Promise.resolve({
				default: { identifier: 'foo' },
			});
		}
		return Promise.resolve({
			default: {
				type: 'foobar',
				data: { identifier: `${SEDGE_NAMESPACE}:foo` },
			},
		});
	},
	readTextFileSync: () => 'export default 1',
	// @ts-ignore - we only need `isDirectory`
	lstatSync: () => ({ isDirectory: true }),
};
