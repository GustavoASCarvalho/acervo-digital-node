import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/types/api-error';
import jwt from 'jsonwebtoken';

export type JwtPayload = {
	id: string;
};

export class AuthMiddleware {
	async middleware(req: Request, res: Response, next: NextFunction) {
		const { authorization } = req.headers;

		if (!authorization) {
			throw new ApiError(`Não autorizado`, 401);
		}

		const token = authorization.split(' ')[1];

		const { id } = jwt.verify(token, process.env.JWT_PASS!) as JwtPayload;

		res.locals.id = id;
		next();
	}
}
