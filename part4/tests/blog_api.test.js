const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

beforeEach( async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs
        .map(b => new Blog(b))
    
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
})

test('the correct amount of blog posts are returned in the JSON format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(2)
})

test('blog posts have a unique identifier property named id,', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)

    expect(ids).toBeDefined()
    expect(response.body[0]._id).toBe(undefined)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Api testing',
        author: 'Johnny Banoffi',
        url: 'johnnyb@mail.com',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
        'Api testing'
    )
})


afterAll(async () => {
    await mongoose.connection.close()
})