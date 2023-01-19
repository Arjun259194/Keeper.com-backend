import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import ListModel, { List } from "../models/List"
import Controller from "../modules/classes"

export class TaskController extends Controller {
  public Get(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    return response.send("This is from TaskController class")
  }
  public Post(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  public Put(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  public Delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
}

export class ListController extends Controller {
  public async Get(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    try {
      const lists = await ListModel.find({ userId: request.userId }).exec()
      if (!lists || lists.length <= 0) return response.status(404).json({ status: "not found", message: "There are not lists" })

      response.status(200).json({ status: "ok", lists })
    } catch (error) {
      this.ErrorHandler(response, error)
    }
  }
  public async Post(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    try {
      if (!request.body.title) throw new Error("Bad request, title not found")
      const newList = await new ListModel({
        title: request.body.title,
        userId: request.userId as string,
        pinned: false,
        tasks: [
          {
            content: "Demo task",
            state: "Not Done",
            pinned: false,
          },
        ],
      }).save()

      response.status(201).json({
        status: "Created successfully",
        message: "List created successfully",
        list: newList,
      })
    } catch (error: any) {
      this.ErrorHandler(response, error)
    }
  }
  public async Put(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    try {
      const newList: List = request.body
      const updatedList = await ListModel.findOneAndUpdate({ _id: request.params.id }, newList)
      if (updatedList === null)
        return response.status(402).json({
          status: "not updated",
          message: "Send data is not modified in database\ntry again",
        })

      return response.status(200).json({
        status: "updated successfully",
        message: "data modified successfully",
      })
    } catch (error: any) {
      this.ErrorHandler(response, error)
    }
  }
  public async Delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
    try {
      const removedList = await ListModel.findOneAndDelete({ _id: request.params.id })
      if (removedList === null) return response.status(404).json({ status: "not found", message: "given list id not found in database" })

      return response.status(200).json({ status: "ok", message: "list deleted from database" })
    } catch (error: any) {
      this.ErrorHandler(response, error)
    }
  }
}
