import { Request, Response } from "express"
import ListModel, { List } from "../models/List"
import { errorMessage } from "../modules/functions"

class ListController {
  private ErrorHandler = (response: Response, error: any) => {
    errorMessage(error)
    return response.status(400).json({
      status: "Bad request",
      message: "There is an error",
      error: error.message,
    })
  }

  public CreateNewList = async (request: Request, response: Response) => {
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

  public GetLists = async (request: Request, response: Response) => {
    try {
      const lists = await ListModel.find({ userId: request.userId }).exec()
      if (!lists || lists.length <= 0)
        return response.status(404).json({ status: "not found", message: "There are not lists" })

      response.status(200).json({ status: "ok", lists })
    } catch (error) {
      this.ErrorHandler(response, error)
    }
  }

  public UpdateListWithId = async (request: Request, response: Response) => {
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

  public RemoveListWithId = async (request: Request, response: Response) => {
    try {
      const removedList = await ListModel.findOneAndDelete({ _id: request.params.id })
      if (removedList === null)
        return response
          .status(404)
          .json({ status: "not found", message: "given list id not found in database" })

      return response.status(200).json({ status: "ok", message: "list deleted from database" })
    } catch (error: any) {
      this.ErrorHandler(response, error)
    }
  }
}

export default ListController
