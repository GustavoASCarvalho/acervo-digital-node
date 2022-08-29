import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/types/api-error';
import { ApiResponse } from '../helpers/types/api-response';

export class ErrorMiddleware {
	async middleware(
		error: Error | ApiError,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) {
		if (error instanceof ApiError) {
			return res.status(error.statusCode).json({
				message: error.message,
				statusCode: error.statusCode,
			} as ApiResponse);
		}
		return res.status(500).json({
			message: 'Erro interno do servidor',
			statusCode: 500,
		} as ApiResponse);
	}
}
