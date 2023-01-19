import { Request, Response } from "express"
import { errorMessage } from "./functions"

abstract class Controller {
  protected ErrorHandler = (response: Response, error: any) => {
    errorMessage(error)
    return response.status(400).json({
      status: "Bad request",
      message: "There is an error",
      error: error.message,
    })
  }
  public abstract Get(request: Request, response: Response): any
  public abstract Post(request: Request, response: Response): any
  public abstract Put(request: Request, response: Response): any
  public abstract Delete(request: Request, response: Response): any
}

export default Controller
