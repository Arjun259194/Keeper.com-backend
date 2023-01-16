import mongoose, { Schema, model } from "mongoose"

export interface User extends mongoose.Document {
	name: string
	email: string
	password: string
	lists: any[]
}

const userSchema: Schema = new Schema({
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

export const UserModel = model<User>("User", userSchema)
