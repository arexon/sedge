import { SEDGE_NAMESPACE } from '../core/constants.ts';

export interface SedgeFileSystem {
	import(path: string, type?: 'json'): Promise<any>;
	readTextFileSync(path: string | URL): string;
}

export const sedgeFileSystem: SedgeFileSystem = {
	import: (path, type) => {
		if (type === 'json') return import(path, { assert: { type } });
		return import(path);
	},
	readTextFileSync: (path) => Deno.readTextFileSync(path),
};

export const fakeFileSystem: SedgeFileSystem = {
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
};
