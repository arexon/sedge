import { UseFunction } from '../common/functions'
import type { Namespace } from '../common/template'
import type {
	BrewingContainerFunction,
	BrewingMixFunction,
	FurnaceFunction,
	MaterialReductionFunction,
	ShapedFunction,
	ShapelessFunction
} from './functions'

interface RecipeTemplate
	extends Namespace,
		FurnaceFunction,
		ShapedFunction,
		ShapelessFunction,
		BrewingMixFunction,
		BrewingContainerFunction,
		MaterialReductionFunction,
		UseFunction {}

export type { RecipeTemplate }
