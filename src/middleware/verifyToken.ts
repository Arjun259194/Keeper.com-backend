import { Response, Request, NextFunction } from "express"

export const verifyToken = (response: Response, request: Request, next: NextFunction): void => {
	console.log("middleware working")
}
