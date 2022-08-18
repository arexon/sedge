import { start } from '@/compiler/mod.ts';

await start({
	mode: 'build',
	target: 'prototype',
});
