export type MaterialInstances = {
	/**
	 * ## Material Instances
	 *
	 * The material instances for a block.
	 * Maps face or material_instance names in a geometry file to an actual material instance.
	 * Material instance can either be a full material instance or a name to another already defined instance.
	 * Limited to 64 instances.
	 *
	 * @requires Holiday Creator Features
	 */
	material_instances?: {
		/**
		 * ### Material Instance
		 *
		 * A material instance definition to map to a material instance in a geometry file.
		 * The material instance '*' will be used for any materials that don't have a match.
		 */
		[
			key:
				| string
				| 'up'
				| 'down'
				| 'sides'
				| 'north'
				| 'east'
				| 'south'
				| 'west'
		]: {
			/**
			 * #### Ambient Occlusion
			 *
			 * Should this material have ambient occlusion applied when lighting.
			 * If true, shadows will be created around and underneath the block.
			 *
			 * @default true
			 */
			ambient_occlusion?: boolean

			/**
			 * #### Face Dimming
			 *
			 * Should this material be dimmed by the direction it's facing.
			 *
			 * @default true
			 */
			face_dimming?: boolean

			/**
			 * #### Render Method
			 *
			 * The render method to use.
			 *
			 * @default 'opaque'
			 */
			render_method?: 'opaque' | 'double_sided' | 'blend' | 'alpha_test'

			/**
			 * #### Texture
			 *
			 * Name of a texture from the `terrain_texture.json` file.
			 */
			texture?: string
		}
	}
}
