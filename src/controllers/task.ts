import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import ListModel from "../models/List"
import Controller from "../modules/classes"
import { errorMessage } from "./../modules/functions"

class TaskController extends Controller {
  public Get(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ) {
    throw new Error("Method not implemented.")
  }
  public async Post(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ) {
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
  public async Put(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ) {
    try {
      const LIST_ID = request.params.listId

      const list = await ListModel.findById(LIST_ID).exec()

      if (!list)
        return response
          .status(402)
          .json({ status: "bad request", message: "list not found" })

      const TASK_ID = request.params.taskId

      const filter = { _id: LIST_ID, "tasks._id": TASK_ID }
      const update: { [key: string]: string | boolean } = {}

      if (request.body.state !== undefined)
        update["tasks.$.state"] = request.body.state
      if (request.body.content !== undefined)
        update["tasks.$.content"] = request.body.content
      if (request.body.pinned !== undefined)
        update["tasks.$.pinned"] = request.body.pinned

      if (Object.keys(update).length === 0)
        return response.status(402).json({
          status: "bad request",
          message: "no valid data sent",
        })

      const updatedList = await ListModel.updateOne(filter, {
        $set: update,
      }).exec()

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
  public async Delete(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ) {
    try {
      const list = await ListModel.findById(request.params.listId)
      if (!list)
        return response
          .status(404)
          .json({ status: "not found", message: "list not found" })
      list.tasks = list.tasks.filter(
        (task: any) => task.id !== request.params.taskId
      )
      await list.save()
      return response
        .status(200)
        .json({ status: "OK", message: "task deleted" })
    } catch (err: any) {
      errorMessage(err)
      return response.json({
        status: "ERROR",
        error: err.message,
      })
    }
  }
}

export default TaskController
