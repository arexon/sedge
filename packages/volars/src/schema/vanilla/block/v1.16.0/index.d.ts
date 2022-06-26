import type { Namespace } from '../namespace'
import type { DescriptionFunction, ComponentsFunction } from '../functions'
import type * as Component_1_16_0 from './components'

type Components = Component_1_16_0.DestoryTime &
	Component_1_16_0.ExplosionResistance &
	Component_1_16_0.Flammable &
	Component_1_16_0.Friction &
	Component_1_16_0.Loot &
	Component_1_16_0.MapColor

type Template_1_16_0 = Namespace &
	DescriptionFunction<false> &
	ComponentsFunction<Components>

export { Template_1_16_0 }
