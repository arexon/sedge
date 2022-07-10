export function prependWithMinecraftNamespaces<
	Object extends Record<string, any>
>(object: Object): Object {
	const namespace = 'minecraft'
	for (const key in object) {
		if (key === 'components') {
			object[key] = prependNamespacesInObject(object[key], namespace)
		}
		if (key === 'permutations') {
			object[key] = prependNamespacesInArray(
				object[key],
				'components',
				namespace
			) as Object[Extract<keyof Object, string>]
		}
	}
	return object
}

export function removeEmptyFields<Object extends Record<string, any>>(
	object: Object
): Object {
	for (const key in object) {
		if (objectIsEmpty(object[key])) {
			delete object[key]
		}
	}
	return object
}

function objectIsEmpty<Object extends Record<string, any>>(
	object: Object
): boolean {
	for (const _key in object) {
		return false
	}
	return true
}

function prependNamespacesInArray<Object extends Record<string, any>>(
	array: Object[],
	target: keyof Object,
	namespace: string
): Object[] {
	for (const object of array) {
		prependNamespacesInObject(object[target], namespace)
	}
	return array
}

function prependNamespacesInObject<T extends Record<string, any>>(
	object: T,
	namespace: string
): T {
	for (const key in object) {
		object[`${namespace}:${key}` as keyof T] = object[key]
		delete object[key]
	}
	return object
}
