export function prependNamespacesInArray<T>(
	array: T[],
	target: keyof T,
	namespace: string
): T[] {
	for (const object of array) {
		prependNamespacesInObject(object[target], namespace)
	}
	return array
}

export function prependNamespacesInObject<T extends Record<string, any>>(
	object: T,
	namespace: string
): object {
	for (const key in object) {
		object[`${namespace}:${key}` as keyof T] = object[key]
		delete object[key]
	}
	return object
}
