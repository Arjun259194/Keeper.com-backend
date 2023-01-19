import { Request, Response } from "express"
import UserModel from "../models/User"
import { errorMessage } from "../modules/functions"

export const GetUserProfile = async (request: Request, response: Response) => {
  try {
    const user = await UserModel.findById(request.userId)

    if (!user)
      return response.status(404).json({
        status: "User not found",
        message: "User not found in database",
      })

    return response.status(200).json({
      name: user.name,
      email: user.email,
    })
  } catch (error: any) {
    errorMessage(error)
    return response.json({
      error: error.message,
    })
  }
}

export const DeleteUser = async (request: Request, response: Response) => {
  const removedUser = await UserModel.findByIdAndDelete(request.userId)
  if (!removedUser)
    return response.status(404).json({ status: "not found", message: "User not found" })
  return response.status(200).json({ status: "OK", message: "User deleted" })
}
