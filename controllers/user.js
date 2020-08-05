const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHAsh = bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHAsh,
    })

    const savedUser = await user.save()
    return response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})//.populate('blogs')
    response.json(users)
})

module.exports = usersRouter