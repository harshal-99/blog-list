import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
	title: {type: String},
	author: {type: String},
	url: {type: String},
	likes: {type: Number, default: 0},
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

blogSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog
