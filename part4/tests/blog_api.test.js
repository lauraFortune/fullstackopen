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
})


test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Mastering API testing',
        author: 'Johnny Banoffi',
        url: 'http://blog-johnnnybanoffi.com',
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
        'Mastering API testing'
    )
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: "Enchanting Equations",
        author: 'Ada Lovelace',
        url: 'http://blog-adalovelace.com'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.likes).toBe(0)
    expect(response.body.likes).toBeDefined()
})

test('if title or url properties are missing from the request, the backend responds with the status code 400 Bad Request', async () => {
    const newBlog = {
        author: 'Grace Hopper',
        url: 'http://blog-gracehopper.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('deletion of a blog succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        initialBlogs.length - 1
    )
})

test("updating blog post's 'like' property returns status 200", async () => {
    
    const blogs = await blogsInDb()
    const blogToUpdate = blogs[0]
    const likesUpdate = { likes: 5 }
    
    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(likesUpdate)
        .expect(200)

    expect(response.body.likes).toBe(5)
})

afterAll(async () => {
    await mongoose.connection.close()
})