import createDegit from 'degit'
import fse from 'fs-extra'
import superb from 'superb'
import { logger } from '../utils'
import { defineCommand } from './index'

export default defineCommand({
	meta: {
		name: 'init',
		usage: 'npx sedge init [--template|-tp] [dir]',
		description: 'Scaffolds a new Sedge project'
	},
	run: async (args) => {
		const distDir = args._[1] || 'sedge-project'
		const degit = createDegit(args.template)

		if (fse.existsSync(distDir) && fse.readdirSync(distDir).length) {
			logger.error(
				`Directory \`${distDir}\` is not empty. Please choose a different directory or remove it`
			)
			process.exit(1)
		}

		degit.on('warn', (event) => logger.warn(event.message))
		degit.on('info', (event) => logger.info(event.message))

		try {
			await degit.clone(distDir)
		} catch (_) {
			logger.error(
				`Failed to clone template from \`${
					args.template
				}\`. Please check the repo is valid and that you've installed \`${'git'}\` correctly.`
			)
			process.exit(1)
		}

		const nextSteps = [
			distDir.length > 1 && `📁 cd \`${distDir}\``,
			'📦 Install dependencies with `npm install` or `yarn install` or `pnpm install`',
			'🚀 Begin developing your project with `npm run dev` or `yarn dev` or `pnpm dev`'
		].filter(Boolean)

		logger.success(
			`\n🎉 Your ${superb.random()} Sedge project is ready! Next steps:\n`
		)
		for (const step of nextSteps) {
			logger.log(step)
		}
	}
})
