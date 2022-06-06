import consola from 'consola'
import chalk from 'chalk'

export const log = (message: string) => {
	consola.info(`${chalk.magentaBright.bold('Volars')} ${message}`)
}

export const error = (message: unknown) => {
	consola.error(message)
}
