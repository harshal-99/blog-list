export const dummy = blogs => {
	return 1
}

export const totalLikes = blogPost => {
	return blogPost.reduce((sum, likes) => {
		return sum + likes.likes
	}, 0)
}

export const favoriteBlog = blogs => {
	let mostLiked = {likes: 0}
	for (let i = 0; i < blogs.length; i++) {
		if (blogs[i].likes >= mostLiked.likes) {
			mostLiked = blogs[i]
		}
	}

	return {
		title: mostLiked.title,
		author: mostLiked.author,
		likes: mostLiked.likes
	}
}

export const mostBlogs = blogs => {
	let authorBlogs = new Map()
	for (let i = 0; i < blogs.length; i++) {
		if (authorBlogs.has(blogs[i].author)) {
			let blog = authorBlogs.get(blogs[i].author)
			authorBlogs.set(blogs[i].author, blog + 1)
		} else {
			authorBlogs.set(blogs[i].author, 1)
		}
	}

	let maxBlogs = {
		author: "",
		blogs: 0
	}
	for (const authorBlog of authorBlogs) {
		if (authorBlog[1] >= maxBlogs.blogs) {
			maxBlogs.author = authorBlog[0]
			maxBlogs.blogs = authorBlog[1]
		}
	}
	return maxBlogs
}