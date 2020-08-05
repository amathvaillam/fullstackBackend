const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})//.populate('user')
    response.json(blogs)
})


blogRouter.post('/', async (request, response) => {
    const {url, title, userId, author} = request.body
    if (!url || !title) {
        return response.status(400).json({ error: "Bad Request" })
    }

    const user = await User.findById(userId)
    const blog = new Blog({
        likes: 0,
        url,
        title,
        author,
        user: user.id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    if (!body.url || !body.title) {
        return response.status(400).json({ error: "Bad Request" })
    }
    const blog = { likes: 0, ...body }
    var opts = { runValidators: true, new: true }
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, opts)
    return response.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
})

module.exports = blogRouter  