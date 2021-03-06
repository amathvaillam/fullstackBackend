const Blog = require('../models/blog')
const User = require('../models/user')



const initialBlogs =  [
    { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
    { title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
    { title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
    { title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
    { title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]  

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const UsersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    if (blogs.length === 0)
        return 0
    else if (blogs.length === 1)
        return blogs[0].likes
    else {
        return blogs.reduce((sum, item) => sum + item.likes, 0)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return {}
    else if (blogs.length === 1) {
        return {
            title: blogs[0].title,
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }
    else {
        const blog = blogs.reduce((acc, curr) => (!acc.likes || acc.likes < curr.likes) ? curr : acc, {})
        return {
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return {}
    else if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            blogs: 1
        }
    }else{
        let authors = blogs.map(blog => blog.author)
        let oneAuthor = new Set(authors)
        let authorsWithBlogs = Array.from(oneAuthor).map(item => {
            let numBlogs = 0
            authors.forEach(author => {
                if(author === item)
                numBlogs++
            })
            return {author:item, blogs: numBlogs}
        })
        return authorsWithBlogs.reduce((acc, curr) => (!acc.blogs || acc.blogs < curr.blogs) ? curr : acc, {})
    }
}
const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return {}
    else if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            blogs: blogs[0].likes
        }
    }else{
        let authors = blogs.map(blog => blog.author)
        let oneAuthor = new Set(authors)
        let authorsWithLikes = Array.from(oneAuthor).map(item => {
            let numLikes = 0
            blogs.forEach(blog => {
                if(blog.author === item)
                numLikes += blog.likes
            })
            return {author:item, likes: numLikes}
        })
        return authorsWithLikes.reduce((acc, curr) => (!acc.likes || acc.likes < curr.likes) ? curr : acc, {})
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
    blogsInDB,
}