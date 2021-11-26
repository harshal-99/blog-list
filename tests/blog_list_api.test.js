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

afterAll(() => {
	mongoose.connection.close()
})