const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})


blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.url || !body.title) {
        return response.status(400).json({ error: "Bad Request" })
    }
    const blog = new Blog({ likes: 0, ...body })
    const result = await blog.save()
    return response.status(201).json(result)
})

module.exports = blogRouter  