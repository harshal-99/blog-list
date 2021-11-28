import bcrypt              from "bcrypt"
import { request, Router } from "express";

import User from "../models/user.js";

const userRouter = Router()

userRouter.post('/', async (request, response, next) => {
	const body = request.body
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	})

	const savedUser = await user.save()

	response.json(savedUser)
})

userRouter.get('/', async (request, response, next) => {
	const users = await User
		.find({})
		.populate('blogs', {content: 1, date: 1})

	response.json(users)
})

export default userRouter