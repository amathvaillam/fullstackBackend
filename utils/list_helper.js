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
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}