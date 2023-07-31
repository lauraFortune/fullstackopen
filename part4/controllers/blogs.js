const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// @ GET ALL BLOGS
blogsRouter.get('/', async (request, response, next) => {
    try{
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch(error){
        next(error)
    }
})

// @ CREATE A BLOG
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try{
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(error){
        next(error)
    }

})

// @ DELETE A BLOG
blogsRouter.delete('/:id', async (request, response, next) => {
    try{
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(error){
        next(error)
    }
})

// @ UPDATE A BLOG
blogsRouter.put('/:id', async (request, response, next) => {
    
    const blog = { ...request.body }
    
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog)
    } catch(error){
        next(error)
    }
})

module.exports = blogsRouter