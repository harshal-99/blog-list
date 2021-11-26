import mongoose  from "mongoose";
import supertest from "supertest"

import app                         from "../app";
import Blog                        from "../models/blog";
import { blogsInDb, initialBlogs } from "./test_helper.js"

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test("all blogs are returned", async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique property id exists', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('new blog can be added', async () => {
	const blog = {
		title: 'nice blog',
		author: 'me',
		url: 'blog.com',
		likes: 100
	}

	await api
		.post('/api/blogs')
		.send(blog)
		.expect(200)
		.expect("Content-Type", /application\/json/)

	const blogsAtEnd = await blogsInDb()
	expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
	mongoose.connection.close()
})