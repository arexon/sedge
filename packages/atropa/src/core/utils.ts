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
		return [ensureNamespace(namespace, key) as K, value]
	})
}

function ensureNamespace(namespace: string, str: string) {
	if (!str.startsWith(namespace)) return `${namespace}:${str}`
	return str
}

function objectIsEmpty<T extends Record<string, any>>(object: T): boolean {
	for (const _ in object) {
		return false
	}
	return true
}
