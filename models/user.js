import mongoose        from "mongoose";
import uniqueValidator from "mongoose-unique-validator"

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	name: {type: String, required: false},
	passwordHash: {type: String, required: true},
	blogs: [ {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog"
	} ]
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v

		delete returnedObject.passwordHash
	}
})

const User = mongoose.model("User", userSchema)

export default User