import {
	dummy,
	favoriteBlog,
	mostBlogs,
	totalLikes
}                       from "../utils/list_helper"
import { initialBlogs } from "./test_helper";

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]

test("dummy returns one", () => {
	const blogs = []
	const result = dummy(blogs)
	expect(result)
		.toBe(1)
})

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test("when list has lot of blogs", () => {
		expect(totalLikes(initialBlogs)).toBe(36)
	})
})

describe("most liked blog", () => {
	test("when list has only one blog", () => {
		expect(favoriteBlog(listWithOneBlog)).toEqual({
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5,
		})
	})

	test("when list has many blogs", () => {
		expect(favoriteBlog(initialBlogs)).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12,
		})
	})
})

describe("most likes", () => {
	test("when list has only one blog", () => {
		expect(mostBlogs(listWithOneBlog)).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 1
		})
	})

	test("when list has lot of blogs", () => {
		expect(mostBlogs(initialBlogs)).toEqual({
			author: "Robert C. Martin",
			blogs: 3
		})
	})
})