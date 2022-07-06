import type { Namespace } from '../namespace'
import type {
	FurnaceFunction,
	ShapedFunction,
	ShapelessFunction,
	BrewingMixFunction,
	BrewingContainerFunction,
	MaterialReductionFunction
} from './functions'

type RecipeTemplate = Namespace &
	FurnaceFunction &
	ShapedFunction &
	ShapelessFunction &
	BrewingMixFunction &
	BrewingContainerFunction &
	MaterialReductionFunction

export { RecipeTemplate }
