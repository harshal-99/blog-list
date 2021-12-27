import _ from 'lodash'

export const dummy = blogs => {
	return 1
}

export const totalLikes = blogPost => {
	if (!blogPost.length) return 0
	return blogPost.reduce((sum, likes) => sum + likes.likes, 0)
}

export const favoriteBlog = blogs => {
	if (blogs.length === 0) {
		return null
	}

	const withMostVotes = (best, current) => {
		if (!best) {
			return current
		}

		return best.likes > current.likes ? best : current
	}

	return blogs.reduce(withMostVotes, null)
}

export const mostBlogs = blogs => {
	if (blogs.length === 0) {
		return null
	}

	const blogsByAuthor = _.toPairs(_.groupBy(blogs, b => b.author))
	const blockCountByAuthor = blogsByAuthor.map(([ author, blogs ]) => ({
		author,
		blogs: blogs.length
	})).sort((a1, a2) => a2.blogs - a1.blogs)

	return blockCountByAuthor[0]
}

export const mostLikes = blogs => {
	if (blogs.length === 0) {
		return null
	}

	const blogsByAuthor = _.toPairs(_.groupBy(blogs, b => b.author))
	const likeCountByAuthor = blogsByAuthor.map(([ author, blogs ]) => ({
		author,
		likes: blogs.reduce((s, b) => s + b.likes, 0)
	})).sort((a1, a2) => a2.likes - a1.likes)

	return likeCountByAuthor[0]
}