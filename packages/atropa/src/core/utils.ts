import { objectMap } from '@antfu/utils'

export function ensureNamespaces<K extends string, V>(
	object: Record<K, V>,
	namespace: string
): Record<K, V> {
	return objectMap<K, V>(object, (key, value) => {
		return [ensurePrefix(namespace, key), value]
	})
}

function ensurePrefix<T extends string>(prefix: string, string: T): T {
	if (!string.startsWith(prefix)) return `${prefix}:${string}` as T
	return string
}
