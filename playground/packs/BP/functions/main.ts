import { defineMCFunction } from 'sedge/core'

export default defineMCFunction(({ add }) => {
	const animals = ['sheep', 'pig', 'chicken']

	animals.forEach((animal) => add(`say ${animal}`))
})
