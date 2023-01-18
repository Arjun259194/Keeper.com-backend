import mongoose, { model, Schema } from "mongoose"

type taskState = "Done" | "Not Done" | "In process"

export interface List extends mongoose.Document {
  title: string
  userId: string
  pinned: boolean
  tasks: [
    {
      // TaskId: string
      content: string
      state: taskState
      pinned: boolean
    }
  ]
}

const list: Schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tasks: {
    type: [
      {
        state: {
          type: String,
          default: "Not Done",
        },
        // TaskId: {
        //   type: mongoose.Types.ObjectId,
        // },
        content: {
          type: String,
        },
        pinned: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
})

export const ListModel = model<List>("List", list)
