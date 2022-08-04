import { join } from 'pathe'

const localAppDataDir = process.env.LOCALAPPDATA

export const comMojangDir = localAppDataDir
	? join(
			localAppDataDir,
			'Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang'
	  )
	: null
