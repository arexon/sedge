import { loadVolarsConfig } from '../config'

export const sayHi = async (): Promise<void> => {
	const { config } = await loadVolarsConfig()

	console.log(`Hi ${config.namespace}`)
}
