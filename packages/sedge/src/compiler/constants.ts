import { join } from 'pathe'

export const tempDir = join('.sedge')
export const cacheDir = join(tempDir, 'cache')

const localAppDataDir = process.env.LOCALAPPDATA
export const comMojangDir = localAppDataDir
	? join(
			localAppDataDir,
			'Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang'
	  )
	: null
