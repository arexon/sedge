import { Md5 } from 'hash/md5.ts';
import { resolve, toFileUrl } from 'path';
import { SEDGE_NAMESPACE } from '../core/constants.ts';
import { Config } from './config.ts';

interface ModuleOptions {
	hmr?: boolean;
	config?: Config;
}

export async function loadModule(
	path: string,
	options: ModuleOptions = {},
): Promise<any> {
	const { hmr = false, config } = options;
	const source = Deno.readTextFileSync(resolve(path));

	let fileUrl = toFileUrl(resolve(path)).href;
	if (hmr) fileUrl = `${fileUrl}?hash=${hashModule(source)}`;

	const result = await import(fileUrl);

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
