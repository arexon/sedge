import { Md5 } from 'hash/md5.ts';
import { toFileUrl } from 'path';
import { SEDGE_NAMESPACE } from '../core/constants.ts';
import { Config } from './config.ts';
import { SedgeFileSystem } from './fs.ts';

interface ModuleOptions {
	hmr?: boolean;
	config?: Config;
	fs: SedgeFileSystem;
}

export async function loadModule(
	path: string,
	options: ModuleOptions,
): Promise<any> {
	const { hmr = false, config, fs } = options;
	const source = fs.readTextFileSync(path);

	let fileUrl = toFileUrl(path).href;
	if (hmr) fileUrl = `${fileUrl}?hash=${hashModule(source)}`;

	const result = await fs.import(fileUrl);

	return applyConfig(result.default, config!);
}

function applyConfig<Object extends Record<string, any>>(
	object: Object,
	config: Config,
): Object {
	if (!config) return object;
	return JSON.parse(
		JSON.stringify(object).replaceAll(SEDGE_NAMESPACE, config.namespace),
	);
}

function hashModule(source: string): string {
	return new Md5().update(JSON.stringify(source)).toString();
}
