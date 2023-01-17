import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Response, Request } from "express"
import { User, UserModel } from "../models/User"
import { errorMessage } from "../modules/functions"

//environment variables
const JWT_KEY = process.env.JWT_KEY || "topSecret"

const isUser = (object: unknown): object is User => {
  if (object != null && typeof object == "object") {
    return "_id" in object
  }
  return false
}

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password }: { email: string; password: string } = request.body

    const user: unknown = await UserModel.findOne({ email: email }).exec()
    if (!user)
      return response.status(404).json({
        status: "email not found",
        message: "email is not to be found in database",
      })
    if (isUser(user)) {
      const matchPassword: boolean = await bcrypt.compare(password, user.password)

      if (!matchPassword)
        return response.status(402).json({
          status: "Bad request",
          message: "Password is not current",
        })

      const TOKEN = jwt.sign(user.id, JWT_KEY)

      return response.status(200).json({
        status: "Successful",
        message: "Authentication successfully done",
        token: TOKEN,
      })
    }
  } catch (err: any) {
    errorMessage(err)
    return response.status(500).json({
      error: err.message,
    })
  }
}

export const register = async (request: Request, response: Response) => {
  try {
    const { name, email, password }: { name: string; email: string; password: string } =
      request.body

    if (!password)
      return response.status(400).json({
        status: "failed",
        message: "not valid password",
      })

    const SALT_ROUND = 10
    const hashedPassword: string = await bcrypt.hash(password, SALT_ROUND)

    await new UserModel({ name, email, password: hashedPassword }).save()

    return response.status(200).json({
      status: "ok",
      message: "user registered",
    })
  } catch (err: any) {
    errorMessage(err)
    return response.status(500).json({
      error: err.message,
    })
  }
}
