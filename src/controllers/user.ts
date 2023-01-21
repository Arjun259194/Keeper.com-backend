import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import UserModel from "../models/User"
import Controller from "../modules/classes"
import { errorMessage } from "../modules/functions"

class UserController extends Controller {
  public async Get(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
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
      return response.status(402).json({ status: "error", Error: error.message })
    }
  }
  public Post(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  public Put(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  public async Delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    try {
      const removedUser = await UserModel.findByIdAndDelete(request.userId)
      if (!removedUser) return response.status(404).json({ status: "not found", message: "User not found" })
      return response.status(200).json({ status: "OK", message: "User deleted" })
    } catch (err: any) {
      errorMessage(err)
      return response.status(402).json({ status: "error", Error: err.message })
    }
  }
}

export default UserController
