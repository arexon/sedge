import { SEDGE_NAMESPACE } from '../core/constants.ts';

export interface SedgeFileSystem {
	import(path: string, type?: 'json'): Promise<any>;
	readTextFileSync(path: string | URL): string;
	lstatSync(path: string | URL): Deno.FileInfo;
}

export const sedgeFileSystem: SedgeFileSystem = {
	import: (path, type) => {
		if (type === 'json') return import(path, { assert: { type } });
		return import(path);
	},
	readTextFileSync: (path) => Deno.readTextFileSync(path),
	lstatSync: (path) => Deno.lstatSync(path),
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
