import type { Namespace } from '../../common/template'
import type {
	FurnaceFunction,
	ShapedFunction,
	ShapelessFunction,
	BrewingMixFunction,
	BrewingContainerFunction,
	MaterialReductionFunction
} from './functions'

interface RecipeTemplate
	extends Namespace,
		FurnaceFunction,
		ShapedFunction,
		ShapelessFunction,
		BrewingMixFunction,
		BrewingContainerFunction,
		MaterialReductionFunction {}

export type { RecipeTemplate }
