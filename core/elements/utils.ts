import { mapEntries } from 'collection/map_entries.ts';

export function ensureNamespaces<K extends string, V>(
	object: Record<K, V>,
	namespace: string,
): Record<K, V> {
	// @ts-ignore - type is correct
	return mapEntries<K, V>(object, ([key, value]) => {
		return [ensurePrefix(namespace, key), value];
	});
}

function ensurePrefix<T extends string>(prefix: string, string: T): T {
	if (!string.startsWith(prefix)) return `${prefix}:${string}` as T;
	return string;
}
