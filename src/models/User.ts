import { Schema, model, InferSchemaType } from "mongoose"

const userSchema = new Schema({
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
	lists: {
		type: [],
	},
})

export type User = InferSchemaType<typeof userSchema>

export const UserModel = model("User", userSchema)
