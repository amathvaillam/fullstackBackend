const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
      }
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
test('unique identifier', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

  
  afterAll(() => {
    mongoose.connection.close()
  })