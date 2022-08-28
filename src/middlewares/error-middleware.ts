import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/api-error';

export class ErrorMiddleware {
	async middleware(
		error: Error | ApiError,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) {
		if (error instanceof ApiError) {
			return res
				.status(error.statusCode)
				.json({ messages: error.messages, code: error.statusCode });
		}
		return res
			.status(500)
			.json({ messages: ['Erro interno do servidor'], status: 500 });
	}
}
