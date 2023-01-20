type taskState = "Done" | "Not Done" | "In process"

export type Task = {
  content: string
  state: taskState
  pinned: boolean
}
