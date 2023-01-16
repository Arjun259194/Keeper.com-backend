import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Response, Request, NextFunction } from "express"

export const verifyToken = (
	response: Response,
	request: Request,
	next: NextFunction
): void => {}
