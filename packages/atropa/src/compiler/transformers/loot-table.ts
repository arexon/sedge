interface UserTemplate {
	namespace: string
	pools: (template: Record<string, any>[]) => void
}

interface VanillaTemplate {
	pools?: Record<string, any>[]
}

export function processTemplate(template: VanillaTemplate): UserTemplate {
	return {
		namespace: process._namespace,
		pools: (_template) => {
			template.pools = [..._template, ...(template.pools || [])]
		}
	}
}
