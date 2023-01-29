import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import UserModel from "../models/User"
import { errorMessage } from "../modules/functions"

const JWT_KEY = process.env.JWT_KEY || "topSecret"

//environment variables
class AuthController {
  async login(request: Request, response: Response) {
    try {
      const { email, password }: { email: string; password: string } =
        request.body

      const user = await UserModel.findOne({ email: email }).exec()

      if (!user)
        return response.status(404).json({
          status: "email not found",
          message: "email is not to be found in database",
        })

      const matchPassword: boolean = await bcrypt.compare(
        password,
        user.password
      )

      if (!matchPassword)
        return response.status(402).json({
          status: "Bad request",
          message: "Password is not current",
        })

      const TOKEN = jwt.sign(user.id, JWT_KEY)

      return response
        .cookie("access-token", TOKEN, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })

        .status(200)
        .json({
          status: "Successful",
          message: "Authentication successfully done",
        })
    } catch (err: any) {
      errorMessage(err)
      return response.status(500).json({
        error: err.message,
      })
    }
  }

  async logout(request: Request, response: Response) {
    return response
      .clearCookie("access-token")
      .status(200)
      .json({ status: "User logged out" })
  }

  async register(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        password,
      }: { name: string; email: string; password: string } = request.body

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

  checkAuthorization(request: Request, response: Response) {
    const token = request.cookies["access-token"]
    if (!token) {
      return response.status(401).json({
        status: "Not authorized",
      })
    }

    try {
      jwt.verify(token, JWT_KEY)
      return response.status(200).json({ status: "User is authorized" })
    } catch (err: any) {
      return response.status(401).json({ status: "User not authorized" })
    }
  }
}

export default AuthController
