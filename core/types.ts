export interface Result<Data extends Record<string, any> | string> {
	type: 'gameElement';
	data: Data;
}
