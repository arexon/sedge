import { Namespace } from '../Namespace'
import { Description, DescriptionFunction } from '../Description'
import { ComponentsFunction } from '../Components'
import {
	DestoryTime,
	ExplosionResistance,
	Flammable,
	Friction,
	Loot,
	MapColor
} from './components'

type Components = DestoryTime &
	ExplosionResistance &
	Flammable &
	Friction &
	Loot &
	MapColor

export type Template_1_16_0 = Namespace &
	DescriptionFunction<Description> &
	ComponentsFunction<Components>
