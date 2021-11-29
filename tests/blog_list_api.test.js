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

describe('when there is initially some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect("Content-Type", /application\/json/)
	})

	test("all blogs are returned", async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})

	test('a specific blog is within returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const contents = response.body.map(r => r.title)
		expect(contents).toContain('Go To Statement Considered Harmful')
	})
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await blogsInDb()

		expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

		const contents = blogsAtEnd.map(r => r.title)
		expect(contents).not.toContain(blogToDelete.title)
	})
})


describe('updating a blog', () => {
	test('succeeds with status code 200 if id is valid', async () => {
		const blogsAtStart = await blogsInDb()
		const blogToUpdate = blogsAtStart[0]
		blogToUpdate.likes += 1

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(200)

		expect(updatedBlog.body.likes).toBe(initialBlogs[0].likes + 1)
	})
})

test('unique property id exists', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
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

test('a blog with missing likes property has 0 likes', async () => {
	const newBlog = {
		title: 'nice blog',
		author: 'me',
		url: 'blog.com',
	}

	const response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect("Content-Type", /application\/json/)

	expect(response.body.likes).toBe(0)
})

test('blog without title or url are not saved', async () => {
	const newBlog = {
		author: 'me',
		url: 'blog.com',
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)
		.expect("Content-Type", /application\/json/)
})

afterAll(() => {
	mongoose.connection.close()
})
