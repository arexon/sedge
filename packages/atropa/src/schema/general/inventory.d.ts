type ItemGroup = `itemGroup.item.${string}`

type CreativeGroup =
	| 'nature'
	| 'construction'
	| 'items'
	| 'equipment'
	| 'none'
	| 'commands'

export type { ItemGroup, CreativeGroup }
