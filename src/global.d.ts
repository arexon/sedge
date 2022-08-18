import type { Config } from './compiler/mod.ts';

declare global {
	var sedge: {
		config: Config;
	};
}
export {};
