import { startSedge } from '@/compiler//mod.ts';

await startSedge({
	mode: 'build',
	target: 'default',
});
