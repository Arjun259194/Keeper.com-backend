import { Document, model, Schema } from "mongoose"
import ListModel from "./List"

export interface User extends Document {
  name: string
  email: string
  password: string
}

const USER_SCHEMA: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "User-Collection" }
)

USER_SCHEMA.pre("findOneAndDelete", async function (next) {
  const USER_ID = this.getQuery()._id
  await ListModel.deleteMany({ userId: USER_ID })
  next()
})

const UserModel = model<User>("User", USER_SCHEMA)

export default UserModel
