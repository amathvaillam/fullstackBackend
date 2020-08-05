const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body
    const passwordCheck = pass => pass.length < 3

    if (body.password === undefined || passwordCheck(body.password)) {
        const msg = body.password === undefined ? 'missing password' : 'password minlength is 3'
        return response.status(400).json({ error: msg})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds) 

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    return response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter