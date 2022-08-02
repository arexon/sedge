import { defineMCFunction } from 'sedge/core'

export default defineMCFunction(({ run }) => {
	const animals = ['sheep', 'pig', 'chicken']

	animals.forEach((animal) => run(`say ${animal}`))
})
