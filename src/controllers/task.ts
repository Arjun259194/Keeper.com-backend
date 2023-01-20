import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import ListModel from "../models/List"
import Controller from "../modules/classes"
import { errorMessage } from "./../modules/functions"

class TaskController extends Controller {
  public Get(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  public async Post(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    try {
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
    } catch (err: any) {
      return response.status(402).json({
        status: "error",
        error: err.message,
      })
    }
  }
  public async Put(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    try {
      const LIST_ID = request.params.listId

      const list = await ListModel.findById(LIST_ID).exec()

      if (!list) return response.status(402).json({ status: "bad request", message: "list not found" })

      const TASK_ID = request.params.taskId

      const { state, content, pinned } = request.body

      const filter = { _id: LIST_ID, "tasks._id": TASK_ID }
      const query = {
        $set: {
          "tasks.$.state": !state ? null : state,
          "tasks.$.content": !content ? null : content,
          "tasks.$.pinned": pinned,
        },
      }
      // const query = {
      //   $set: {
      //     "tasks.$.state": !request.body.state ? null : request.body.state,
      //     "tasks.$.content": !request.body.content ? null : request.body.content,
      //     "tasks.$.pinned": request.body?.pinned,
      //   },
      // }

      const updatedList = await ListModel.updateOne(filter, query).exec()

      console.log(updatedList)

      return response.status(200).json({
        states: "ok",
        message: "updated",
      })
    } catch (err: any) {
      errorMessage(err)
      return response.status(402).json({
        status: "error",
        error: err.message,
      })
    }
  }
  public Delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
}

export default TaskController
