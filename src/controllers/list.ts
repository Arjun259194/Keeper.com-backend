import { Request, Response } from "express"
import mongoose from "mongoose"
import { ListModel } from "../models/List"
import { errorMessage } from "../modules/functions"

class ListController {
  public CreateNewList = async (request: Request, response: Response) => {
    try {
      if (!request.body.title) throw new Error("Bad request, title not found")
      const newList = await new ListModel({
        title: request.body.title,
        userId: request.userId as string,
        pinned: false,
        tasks: [
          {
            TaskId: new mongoose.Types.ObjectId()._id.toString(),
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

  public GetLists = async (request: Request, response: Response) => {}

  public RemoveListWithId = async (request: Request, response: Response) => {}

  public UpdateListWithId = async (request: Request, response: Response) => {}

  private ErrorHandler = (response: Response, error: any) => {
    errorMessage(error)
    return response.status(400).json({
      status: "Bad request",
      message: "There is an error",
      error: error.message,
    })
  }
}

export default ListController
