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


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}