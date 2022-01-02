import bcrypt     from "bcrypt"
import { Router } from "express";

import User from "../models/user.js";

const userRouter = Router()

userRouter.get('/', async (request, response, next) => {
	const users = await User
		.find({})
		.populate('blogs', {title: 1, url: 1, likes: 1, author: 1})

	response.json(users.map(u => u.toJSON()))
})

userRouter.post('/', async (request, response, next) => {
	const {password, name, username} = request.body

	if (!password || password.length < 3) {
		return response.status(400).json({error: 'password must min length 3'})
	}

/*	if (!username || username.length < 3) {
		return response.status(400).json({error: 'username must min length 3'})
	}*/

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username, name,
		passwordHash
	})

	const savedUser = await user.save()

	response.json(savedUser)
})


export default userRouter
