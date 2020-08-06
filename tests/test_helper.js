const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhYmEiLCJpZCI6IjVmMmFjZDdkYTExZWUzMTBmNDQxOWM1ZSIsImlhdCI6MTU5NjY0MTY5M30.vOUSndlZ2sPgwgRyIhYihNsM2CdSXdqOmsbWtAFl9ms';

const hook = (method = 'post') => (url) =>
  supertest(app)
    [method](url)
    .set('Authorization', `Bearer ${TOKEN}`);

const api = {
  post: hook('post'),
  get: hook('get'),
  put: hook('put'),
  delete: hook('delete'),
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {usersInDB, api}