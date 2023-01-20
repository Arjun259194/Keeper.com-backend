import { Task } from "./types"

export interface List extends Document {
  title: string
  userId: string
  pinned: boolean
  tasks: Array<Task>
}

export interface User extends Document {
  name: string
  email: string
  password: string
}
