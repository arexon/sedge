export function prependWithMinecraftNamespaces<T>(object: T): T {
	const namespace = 'minecraft'
	for (const key in object) {
		if (key === 'components') {
			object[key] = prependNamespacesInObject(object[key], namespace)
		}
		if (key === 'permutations') {
			// @ts-expect-error - this is a valid key
			object[key] = prependNamespacesInArray(
				// @ts-expect-error - this is a valid key
				object[key],
				'components',
				namespace
			)
		}
	}
	return object
}

export function removeEmptyFields<T>(object: T): T {
	for (const key in object) {
		if (objectIsEmpty(object[key])) {
			delete object[key]
		}
	}
	return object
}

function objectIsEmpty<T>(object: T): boolean {
	for (const _key in object) {
		return false
	}
	return true
}

function prependNamespacesInArray<T>(
	array: T[],
	target: keyof T,
	namespace: string
): T[] {
	for (const object of array) {
		prependNamespacesInObject(object[target], namespace)
	}
	return array
}

function prependNamespacesInObject<T>(object: T, namespace: string): T {
	for (const key in object) {
		object[`${namespace}:${key}` as keyof T] = object[key]
		delete object[key]
	}
	return object
}
