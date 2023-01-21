import { Request, Response } from "express"

abstract class Controller {
  public abstract Get(request: Request, response: Response): any
  public abstract Post(request: Request, response: Response): any
  public abstract Put(request: Request, response: Response): any
  public abstract Delete(request: Request, response: Response): any
}

export default Controller
