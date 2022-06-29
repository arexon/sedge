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
