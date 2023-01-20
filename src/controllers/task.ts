import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import ListModel from "../models/List"
import Controller from "../modules/classes"

class TaskController extends Controller {
  public Get(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  public async Post(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    const LIST_ID: string = request.params.listId
    const list = await ListModel.findById(LIST_ID)

    if (!list)
      return response.status(402).json({
        status: "bad request",
        message: "List not found",
      })

    list.tasks.push({
      content: request.body.content,
      state: "Not Done",
      pinned: false,
    })

    await list.save()

    return response.status(200).json({
      status: "OK",
      message: "Task added",
    })
  }
  public Put(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  public Delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
}

export default TaskController
