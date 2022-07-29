import { join } from 'pathe'

const localAppDataFolder = process.env.LOCALAPPDATA

export const comMojangFolder = localAppDataFolder
	? join(
			localAppDataFolder,
			'Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang'
	  )
	: null
