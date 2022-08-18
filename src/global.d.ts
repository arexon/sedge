import type { CompileMode, Config } from './compiler/mod.ts';

declare global {
	var sedge: {
		config: Config;
		mode: CompileMode;
		target: {
			name: string;
			path: string;
			isMojangDir: boolean;
		};
	};
}
export {};
