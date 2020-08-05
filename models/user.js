const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
//mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
    name: String,
    username:{
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    passwordHash: {
        type: String,
        required:true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)