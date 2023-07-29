const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// @ GET ALL BLOGS
blogsRouter.get('/', (request, response) => {
Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
})

// @ CREATE A BLOG
blogsRouter.post('/', (request, response, next) => {
const blog = new Blog(request.body)

blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
    .catch(error => next(error))
})

// @ DELETE A BLOG
blogsRouter.delete('/:id', async (request, response, next) => {
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  
})

module.exports = blogsRouter