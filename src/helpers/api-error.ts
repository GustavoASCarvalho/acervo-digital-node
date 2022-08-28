export class ApiError extends Error {
	public readonly statusCode: number;
	public readonly messages: string[];
	constructor(message: string[], statusCode: number) {
		super(message[0]);
		this.statusCode = statusCode;
		this.messages = message;
	}
}
