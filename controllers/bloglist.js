import { request, response, Router } from "express"

import Blog from "../models/blog.js"

const blogRouter = Router()

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
	const blog = new Blog(request.body)

	const savedBlog = await blog.save()
	response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const blog = {
		author: body.author,
		title: body.title,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

	response.json(updatedBlog)
})

export default blogRouter