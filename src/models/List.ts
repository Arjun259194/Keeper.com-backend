import { Document, model, Schema, Types } from "mongoose"

type taskState = "Done" | "Not Done" | "In process"

export type Task = {
  content: string
  state: taskState
  pinned: boolean
}

export interface List extends Document {
  title: string
  userId: string
  pinned: boolean
  tasks: Array<Task>
}

const LIST_SCHEMA: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    userId: {
      type: Types.ObjectId,
      require: true,
      readonly: true,
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
            enum: ["Not Done", "In Process", "Done"],
            default: "Not Done",
          },
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
  },
  { collection: "List-collection" }
)

const ListModel = model<List>("List", LIST_SCHEMA)

export default ListModel
