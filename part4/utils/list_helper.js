const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    return blogs.length === 0
    ? 0
    : blogs.reduce((accum, blogItem) => accum + blogItem.likes, 0)
}

const favouriteBlog = (blogs) => {

    if (!blogs.length) {
        return null
    } 

    const mostLikedBlog = blogs.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev)

    const mostLikedBlogInfo = {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
    }

    return mostLikedBlogInfo

}

const mostBlogs = (blogs) => {

    const authors = blogs.reduce((accum, curr) => {
        let existingAuthor = accum.find(obj => obj.author === curr.author)

        if(existingAuthor){
            existingAuthor.blogs += 1
        } else {
            accum.push(
                {
                    author: curr.author,
                    blogs: 1
                }
            )
        }
        return accum
    }, [])

    const authorWithMostBlogs = authors.reduce((accum, curr) => {
        if(curr.blogs > accum.blogs){
            accum = curr
        }
        return accum
    }, authors[0])

    return blogs.length === 0
    ? null
    : authorWithMostBlogs
}




module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}