import { objectMap } from '@antfu/utils'

export function removeEmptyProperties<T extends Record<string, any>>(
	object: T
): T {
	for (const key in object) {
		if (objectIsEmpty(object[key])) delete object[key]
	}
	return object
}

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

function objectIsEmpty<T extends Record<string, any>>(object: T): boolean {
	for (const _ in object) return false
	return true
}
