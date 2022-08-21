import { SEDGE_NAMESPACE } from '../core/constants.ts';

export interface SedgeFileSystem {
	import(path: string): Promise<any>;
	readTextFileSync(path: string | URL): string;
}

export const sedgeFileSystem: SedgeFileSystem = {
	import: (path) => import(path),
	readTextFileSync: (path) => Deno.readTextFileSync(path),
};

export const fakeFileSystem: SedgeFileSystem = {
	import: () => {
		return Promise.resolve({
			default: {
				type: 'foobar',
				data: { identifier: `${SEDGE_NAMESPACE}:foo` },
			},
		});
	},
	readTextFileSync: () => 'export default 1',
};
