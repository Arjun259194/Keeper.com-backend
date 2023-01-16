import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Response, Request } from "express"
import { User, UserModel } from "../models/User"
import { errorMessage } from "../modules/functions"
import { crossOriginResourcePolicy } from "helmet"

export const login = (request: Request, response: Response): void => {
	response.send("this is login route")
}

export const register = async (request: Request, response: Response) => {
	try {
		const user: User = {
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,
			lists: [],
		}

		!user.password
			? response.status(400).json({
					status: "failed",
					message: "not valid password",
			  })
			: null

		const hashedPassword: string = await bcrypt.hash(user.password, 10)

		await new UserModel({ ...user, password: hashedPassword }).save()

		response.status(200).json({
			status: "ok",
			message: "user registered",
		})
	} catch (err: any) {
		errorMessage(err)
		response.status(500).json({
			error: err.message,
		})
	}
}
